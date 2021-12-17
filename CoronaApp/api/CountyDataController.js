import {getCityName} from "../services/LocationService";

const fetchData = async () => {
    const response = await fetch("https://api.corona-zahlen.org/districts");
    return response.json();
}

const dataSource = {update: 0}

export async function getCountyInformationByName(name) {
    let currentTime = Date.now();
    // Check if the datasource is not invalid
    if(dataSource['update'] - currentTime < 0){
        dataSource['update'] = currentTime;
        dataSource['data'] = await fetchData()
    }
    // Get and map the data of the datasource.
    let dataAsObject = dataSource['data']['data'];
    let dataAsArray = Object.keys(dataAsObject)
        .map(function(key) {
            return dataAsObject[key];
        });
    let county = dataAsArray.filter((data) => data.name === name );
    return county;
}

export async function getCountyInformationByCoordinate(long, lat){
    let county = await getCityName(long, lat);
    return getCountyInformationByName(county);
}
