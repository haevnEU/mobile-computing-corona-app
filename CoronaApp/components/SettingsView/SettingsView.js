import React from "react";
import {View, Text} from "react-native";
import {Switch} from "react-native-elements";
import {Locator} from "../../services/LocationService";
import {styles} from "./SettingsViewStyle";
import {ImpressumView} from "../ImpressumView/ImpressumView";

/**
 * This component contains all elements for the application setting
 * @returns {JSX.Element} New React Native Custom settings component
 */
export const SettingsView = (props) => {
    let gps = props.gps[0];
    let gpsToggle = props.gps[1];
    return (
        <View style={styles.container}>
            <View style={styles.settingsContainer}>
            <Switch color={styles.switch.color}
                    value={gps}
                    onValueChange={gpsState => {
                        if (!gpsState) {
                            // Disable the gps module
                            Locator.disable();
                            gpsToggle(Locator.isGranted());
                        } else {
                            // Try to enable the gps module
                            Locator.request().then(() => gpsToggle(Locator.isGranted()));
                        }
                    }}
            />


            <Text styles={styles.text}>   GPS Tracking</Text>
            </View>

            <ImpressumView />
        </View>)
}
