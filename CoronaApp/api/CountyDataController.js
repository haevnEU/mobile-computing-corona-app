import {getCityName} from "../services/LocationService";
import CountyDoesNotExistsException from "../exceptions/CountyDoesNotExistsException";
import {CountyDataServiceUrl, OneDayAsMilli} from "../utils/ApplicationData";

const dataSource = {update: 0};
let counties = {};

export const updateDataSource = async () => {
    let currentTime = Date.now();

    // Update the datasource if it's older than one day
    if(dataSource['update'] - currentTime < 0){
        const response = await fetch(CountyDataServiceUrl);
        dataSource.data = await response.json();
        console.log("Updated data");
        console.log(dataSource)
        dataSource.update = currentTime + OneDayAsMilli;

        // Each update of the datasource also updates the county list
        let dataAsObject = dataSource.data.data;
        counties = Object
            .keys(dataAsObject)
            .map(key => dataAsObject[key].name);
    }
}

export async function getCountyInformationByName(name) {
    await updateDataSource();

    // Get and map the data of the datasource.
    let dataAsObject = dataSource.data.data;
    let dataAsArray = Object
        .keys(dataAsObject)
        .map(key => dataAsObject[key]);

    // Extract the county out of the datasource
    let county = dataAsArray.filter(data => data.name.toLowerCase() === name.toLowerCase() )[0];

    // Given county does not exist => throw a new exception
    if(undefined === county || null == county){
        throw new CountyDoesNotExistsException("County " + name + " does not exists");
    }
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

export async function getCountyInformationByCoordinate(long, lat) {
    // First map the coordinate to a city using the LocationService
    let county = await getCityName(long, lat);
    return getCountyInformationByName(county);
}

export async function getAllCounties(){
    await updateDataSource();
    return counties;
}


export async function getMappedCounties(){
    let array = await getAllCounties();
    array = array.filter((value, index) => array.indexOf(value)===index);
    let updated = [];
    for (let value of array) {
        updated.push({ "key": value });
    }
    return updated;
}