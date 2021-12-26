import * as Location from 'expo-location';
import GpsLocationException from "../exceptions/GpsLocationException";
import {
    ApplicationSettings,
    LocationServiceApiUrl
} from "../utils/ApplicationData";
import logger from "../utils/Logger";

export default class LocationService {

    #granted = false;

    async getCityName(long, lat) {
        logger.enter("getCityName(" + long + "," +  lat + ")", "LocationService")
        const response = await fetch(LocationServiceApiUrl + "?lat=" + lat + "&lon=" + long + "&format=json");
        let result = await response.json();

        // When the city mapping api call returns not a valid object throw a new GpsLocationException
        if (!result.hasOwnProperty("address") || !result['address'].hasOwnProperty("city")) {
            logger.unexpectedLeft("getCityName(" + long + "," +  lat + ")")
            throw new GpsLocationException("Cannot locationService position")
        }
        logger.leave("getCityName(" + long + "," +  lat + ")", "LocationService")
        return result['address']['city'];
    }

    async getCurrentCityName() {
        logger.enter("getCurrentCityName()", "LocationService");
        let coords = await locate();
        let name = this.getCityName(coords.long, coords.lat);
        logger.leave("getCurrentCityName()", "LocationService");
        return name;
    }

    isGranted() {
        return this.#granted;
    }

    async request() {
        logger.enter("request()", "LocationService");
        const {status} = await Location.requestForegroundPermissionsAsync();
        logger.info("Status is " + status);
        if (status === "granted") {
            this.#granted = true;
        }
        ApplicationSettings.gps = this.#granted;
        logger.leave("request()", "LocationService");
    }


    disable() {
        logger.enter("disable()", "LocationService");
        this.#granted = false;
        ApplicationSettings.gps = this.#granted;
        logger.leave("disable()", "LocationService");
    }

    async locate() {
        logger.enter("locate()", "LocationService");
        if (!this.#granted) {
            logger.unexpectedLeft("locate()")
            throw new GpsLocationException("Gps Access denied");
        }
        let location = await Location.getCurrentPositionAsync({});
        logger.leave("locate()", "LocationService");
        return {
            long: location.coords.longitude,
            lat: location.coords.latitude
        };
    }
}

export const Locator = new LocationService();
export async function getCityName(long, lat){
    return Locator.getCityName(long, lat);
}

export async function getCurrentCityName(){
    return Locator.getCurrentCityName();
}

export function isGranted(){
    return Locator.isGranted()
}

export async function request(){
    return Locator.request()
}

export async function locate(){
    return Locator.locate()
}