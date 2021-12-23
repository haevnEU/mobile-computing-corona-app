import {getAllCounties} from "../api/CountyDataController";

const ApplicationData = {
    "county": "Bochum",
    "state": "NRW",
    "Country": "Germany"
}

export const ApplicationSettings = {
    "gps": false
}

export const LocationServiceApiUrl = "https://nominatim.openstreetmap.org/reverse";
export const CountyDataServiceUrl = "https://api.corona-zahlen.org/districts";
export const NationDataServiceUrl = 'https://api.corona-zahlen.org/germany'

export const OneDayAsMilli = 21600000;
export default ApplicationData;


export async function getMappedCounties(){
    let array = await getAllCounties();
    array = array.filter((value, index) => array.indexOf(value)===index);
    let updated = [];
    for (let value of array) {
        updated.push({ "key": value });
    }
    return updated;
}