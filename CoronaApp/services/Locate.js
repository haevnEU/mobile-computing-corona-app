import * as Location from 'expo-location';
import GpsLocationException from "../exceptions/GpsLocationException";

const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
}

export async function getCityName(long, lat){
    let result = await fetchData("https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + long + "&format=json");

    // When the city mapping api call returns not a valid object throw a new GpsLocationException
    if(result.hasOwnProperty("address") && result['address'].hasOwnProperty("city")){
        return result['address']['city'];
    }else{
        throw new GpsLocationException("Cannot locate position")
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