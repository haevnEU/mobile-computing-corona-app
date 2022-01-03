import {Dimensions, Platform} from "react-native";
import logger from "./Logger";


export function isWeb(){
    return Platform.OS === 'web';
}

export function isMobile(){
    return !isWeb();
}

export const OneDayAsMilli = 21600000;

export const DEVICE_WIDTH = Dimensions.get("window").width

export const CARD_ITEM_WIDTH = DEVICE_WIDTH * 0.9


function toaster(message, format){
    logger.enter("toaster", "GeneralUtils");
    logger.info("Toast data with format");
    logger.info(format)
    toast.show(message, format);
    logger.leave("toaster", "GeneralUtils");
}

export function toasting(message){
    toaster(message, {
        textStyle: toastTextStyle,
        swipeEnabled: toastSwipe,
        placement: toastPlacement,
    });
}

export function toastingGood(message) {
    toaster(message,
        {
            type: "success",
            textStyle: toastTextStyle,
            swipeEnabled: toastSwipe,
            placement: toastPlacement,
        }
    );
}

export function toastingWarning(message) {
    toaster(message,
        {
            type: "warning",
            textStyle: toastTextStyle,
            swipeEnabled: toastSwipe,
            placement: toastPlacement,
        }
    );
}

export function toastingBad(message) {
    toaster(message,
        {
            type: "danger",
            textStyle: toastTextStyle,
            swipeEnabled: toastSwipe,
            placement: toastPlacement,
        }
    );
}

const toastSwipe = true;
const toastPlacement = "bottom"
const toastTextStyle = { fontSize: 23 };