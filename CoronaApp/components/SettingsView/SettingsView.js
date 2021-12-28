import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import { Switch } from "react-native-elements";
import {ApplicationSettings} from "../../utils/ApplicationData";
import {Locator} from "../../services/LocationService";
import {styles} from "./SettingsViewStyle";

/**
 * This component contains all elements for the application setting
 * @returns {JSX.Element} New React Native Custom settings component
 */
export const SettingsView = () => {
    // determines if the gps location is enabled or not
    const [gpsEnabled, setGpsEnabled] = useState(ApplicationSettings.gps);

    // Updates the settings once when the component is loaded
    useEffect(() => {setGpsEnabled(Locator.isGranted())}, []);

    return (
        <View style={styles.container}>
            <Switch color={styles.switch.color}
                    value={gpsEnabled}
                    onValueChange={gpsState => {
                        if (!gpsState) {
                            // Disable the gps module
                            Locator.disable();
                            setGpsEnabled(Locator.isGranted());
                        } else {
                            // Try to enable the gps module
                            Locator.request().then(() => setGpsEnabled(Locator.isGranted()));
                        }
                    }}
            />
            <Text styles={[styles.text]}>GPS Tracking</Text>
        </View>)
}