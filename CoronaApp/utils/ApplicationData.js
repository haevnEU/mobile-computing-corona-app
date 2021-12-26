import {Dimensions} from "react-native";

const ApplicationData = {
    "county": "Bochum",
    "state": "NRW",
    "Country": "Germany"
}

export const ApplicationSettings = {
    "gps": false
}
export const ITEM_WIDTH = Dimensions.get("window").width *0.9

export const LocationServiceApiUrl = "https://nominatim.openstreetmap.org/reverse";
export const CountyDataServiceUrl = "https://api.corona-zahlen.org/districts";
export const NationDataServiceUrl = 'https://api.corona-zahlen.org/germany'

export const OneDayAsMilli = 21600000;
export default ApplicationData;
