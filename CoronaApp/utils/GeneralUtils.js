import {Dimensions, Platform} from "react-native";


export function isWeb(){
    return Platform.OS === 'web';
}

export function isMobile(){
    return !isWeb();
}

export const OneDayAsMilli = 21600000;

export const DEVICE_WIDTH = Dimensions.get("window").width * 0.9

export const CARD_ITEM_WIDTH = DEVICE_WIDTH * 0.9
