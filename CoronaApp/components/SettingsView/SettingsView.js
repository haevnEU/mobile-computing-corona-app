import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import { Switch } from "react-native-elements";
import {ApplicationSettings} from "../../utils/ApplicationData";
import {Locator} from "../../services/LocationService";
import {styles} from "./SettingsViewStyle";


export const SettingsView = () => {
    const [gpsEnabled, setGpsEnabled] = useState(ApplicationSettings.gps);
    useEffect(() => {setGpsEnabled(Locator.isGranted())}, []);

    return (
        <View style={styles.container}>
            <Switch color={styles.switch.color}
                    value={gpsEnabled}
                    onValueChange={gpsState => {
                        if (!gpsState) {
                            Locator.disable();
                            setGpsEnabled(Locator.isGranted());
                        } else {
                            Locator.request().then(() => setGpsEnabled(Locator.isGranted()));
                        }
                    }}
            />
            <Text styles={[styles.text]}>GPS Tracking</Text>
        </View>)
}