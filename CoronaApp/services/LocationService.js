import * as Location from 'expo-location';

const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
}

export async function getCityName(long, lat){
   // https://nominatim.openstreetmap.org/reverse?lat=<value>&lon=<value>&<params>
    let result = await fetchData("https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + long + "&format=json");
    console.log("found for " + long + "/" + lat)
    console.log(result['address']['city']);
    return result['address']['city'];
}

export async function getCurrentCityName(){
    let coords = await LocationService();
    return getCityName(coords.long, coords.lat);
}

export async function LocationService(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status === "granted"){
        let location = await Location.getCurrentPositionAsync({});
        return {
            long: location.coords.longitude,
            lat: location.coords.latitude
        };
    }
}