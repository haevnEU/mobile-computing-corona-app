import {getAllCounties} from "../api/CountyDataController";

const ApplicationData = {
    "county": "Bochum",
    "state": "NRW",
    "Country": "Germany"
}

export const LocationServiceApiUrl = "https://nominatim.openstreetmap.org/reverse";
export const CountyDataServiceUrl = "https://api.corona-zahlen.org/districts";
export const OneDayAsMilli = 21600000;
export default ApplicationData;


export async function getMappedCounties(){
    console.log("Get Mapped Counties")
    let array = await getAllCounties();

    array = array.filter((value, index) => array.indexOf(value)===index);
    let updated = [];
    for (let value of array) {
        updated.push({ "key": value });
    }
    return updated;
}