import * as Location from 'expo-location';

export default async function LocationService(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status === "granted"){
        let location = await Location.getCurrentPositionAsync({});
        return {
            long: location.coords.longitude,
            lat: location.coords.latitude
        };
    }
}