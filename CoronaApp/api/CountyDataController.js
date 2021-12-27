import CountyDoesNotExistsException from "../exceptions/CountyDoesNotExistsException";
import {CountyDataServiceUrl, OneDayAsMilli} from "../utils/ApplicationData";
import logger from "../utils/Logger";

const dataSource = {update: 0};
let counties = {};

/**
 * Updates invalid data for german counties(Landkreise).
 * @returns {Promise<void>}
 */
export const updateCountyDataSource = async () => {
    logger.enter("updateCountyDataSource()", "CountyDataController");
    let currentTime = Date.now();

    // Update the datasource if it's older than one day
    if(dataSource['update'] - currentTime < 0){
        logger.info("Update county data");
        const response = await fetch(CountyDataServiceUrl);
        dataSource.data = await response.json();
        dataSource.update = currentTime + OneDayAsMilli;

        // Each update of the datasource also updates the county list
        logger.info("Update county list")
        let dataAsObject = dataSource.data.data;
        counties = Object
            .keys(dataAsObject)
            .map(key => dataAsObject[key].name);
    }

    logger.leave("updateCountyDataSource()", "CountyDataController");
}

/**
 * Request details about a given county.
 * @param name Name of the county
 * @returns {Promise<JSON>} Json object containing all information about the county.
 */
export async function getCountyInformationByName(name) {
    logger.enter("getCountyInformationByName(" + name +")", "CountyDataController");

    await updateCountyDataSource();

    logger.info("Simplify datasource for local operation")
    // Get and map the data of the datasource.
    let dataAsObject = dataSource.data.data;
    let dataAsArray = Object
        .keys(dataAsObject)
        .map(key => dataAsObject[key]);

    logger.info("Extract county information")
    // Extract the county out of the datasource
    let county = dataAsArray.filter(data => data.name.toLowerCase() === name.toLowerCase() )[0];

    // Given county does not exist => throw a new exception
    if(undefined === county || null == county){
        logger.unexpectedLeft("getCountyInformationByName(" + name +")");
        throw new CountyDoesNotExistsException("County " + name + " does not exists");
    }

    logger.leave("getCountyInformationByName(" + name +")", "CountyDataController");
    // Map the county object to a custom json format
    return {
        "raw":county,
        "name": county['name'],
        "state": county['state'],
        "data": {
            "population":   Math.round(county['population']),
            "cases":        Math.round(county['cases']),
            "casesPerWeek": Math.round(county['casesPerWeek']),
            "death":        Math.round(county['deaths']),
            "deathPerWeek": Math.round(county['deathsPerWeek']),
            "recovered":    Math.round(county['recovered']),
            "incidence":    Math.round(county['weekIncidence']),
            "casesPer100k": Math.round(county['casesPer100k']),
            "delta": county['delta']
        }
    };
}

export async function getAllCounties(){
    logger.enter("getAllCounties", "CountyDataController");

    await updateCountyDataSource();

    logger.leave("getAllCounties", "CountyDataController");
    return counties;
}

/**
 * Maps all german counties(Landkreise) into a processable json entity with the form [{"key":"value"}, ...].
 * @returns {Promise<*[]>}
 */
export async function getCountyListAsProcessableJsonObject(){
    logger.enter("getMappedCounties", "CountyDataController");

    let array = await getAllCounties();

    logger.info("Filter counties");
    array = array.filter((value, index) => array.indexOf(value)===index);
    let updated = [];

    logger.info("Map filtered counties to a json object")
    for (let value of array) {
        updated.push({ "key": value });
    }

    logger.leave("getMappedCounties", "CountyDataController");
    return updated;
}