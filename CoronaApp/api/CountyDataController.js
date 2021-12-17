import {getCityName} from "../services/Locate";
import CountyDoesNotExistsException from "../exceptions/CountyDoesNotExistsException";

const dataSource = {update: 0};
let counties = {};
const updateDataSource = async () => {

    let currentTime = Date.now();
    // Verify that the data source is not older than one day
    if(dataSource['update'] - currentTime < 0){
        console.log("Update");
        const response = await fetch("https://api.corona-zahlen.org/districts");
        dataSource['data'] = await response.json();
        dataSource['update'] = currentTime + 21600000;

        let dataAsObject = dataSource['data']['data'];
        counties = Object.keys(dataAsObject)
            .map(function(key) {
                return dataAsObject[key].name;
            });
    }
}

export async function getCountyInformationByName(name) {
    await updateDataSource();

    // Get and map the data of the datasource.
    let dataAsObject = dataSource['data']['data'];
    let dataAsArray = Object.keys(dataAsObject)
        .map(function(key) {
            return dataAsObject[key];
        });

    let county = dataAsArray.filter((data) => data.name.toLowerCase() === name.toLowerCase() )[0];

    // Given county does not exist => throw a new exception
    if(undefined === county || null == county){
        throw new CountyDoesNotExistsException("County " + name + " does not exists");
    }
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
    await updateDataSource();
    return counties;
}


export async function getCountyInformationByCoordinate(long, lat) {
    let county = await getCityName(long, lat);
    return getCountyInformationByName(county);
}
