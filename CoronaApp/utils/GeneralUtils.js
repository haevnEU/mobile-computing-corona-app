import {Dimensions, Platform, Text} from "react-native";
import View from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedView";
import {useToast} from "react-native-toast-notifications";
import {useEffect} from "react";

export function isWeb(){
    return Platform.OS === 'web';
}

export function isMobile(){
    return !isWeb();
}

export const OneDayAsMilli = 21600000;

export const DEVICE_WIDTH = Dimensions.get("window").width * 0.9

export const CARD_ITEM_WIDTH = DEVICE_WIDTH * 0.9



export function toasting(message, duration = 4000){
    toast.show(message);
}

export function toastingGood(message){
    toast.show(message, {type: "success"});
}
export function toastingWarning(message){
    toast.show(message, {type: "warning"});
}
export function toastingDanger(message){
    toast.show(message, {type: "danger"});
}

