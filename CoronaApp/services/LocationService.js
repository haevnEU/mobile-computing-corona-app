import * as Location from 'expo-location';
import GpsLocationException from "../exceptions/GpsLocationException";
import {LocationServiceApiUrl} from "../utils/ApplicationData";

const fetchData = async (url) => {
    return fetch(url).then(result => {return result}).catch(error => {
        console.log("Error occurred: ");
        console.log(error)
        return {};
    })
}

export async function getCityName(long, lat){
    let result = await fetchData( LocationServiceApiUrl + "?lat=" + lat + "&lon=" + long + "&format=json");
    console.log(result)
    // When the city mapping api call returns not a valid object throw a new GpsLocationException
    if(result.hasOwnProperty("address") && result['address'].hasOwnProperty("city")){
        return result['address']['city'];
    }else{
        throw new GpsLocationException("Cannot locationService position")
    }
}

export async function getCurrentCityName(){
    let coords = await locate();
    return getCityName(coords.long, coords.lat);
}

export async function locate(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status === "granted"){
        let location = await Location.getCurrentPositionAsync({});
        return {
            long: location.coords.longitude,
            lat: location.coords.latitude
        };
    }
}