import React, {useState} from "react";
import {View, Text} from "react-native";
import { Switch } from "react-native-elements";
import {ApplicationSettings} from "../../utils/ApplicationData";
import {styles} from "./SettingsViewStyle";


export const SettingsView = () => {
    const [gpsEnabled, setGpsEnabled] = useState(ApplicationSettings.gps);
    const [initialized, setInitialized] = useState(false);
    if(!initialized){
        setGpsEnabled(ApplicationSettings.gps);
        setInitialized(true);
    }

    return <View style={styles.container}>
        <Switch style={[styles.switch]}
            color="#2089dc"
            value={gpsEnabled}
            onValueChange={(val) => {
                setGpsEnabled(val);
                ApplicationSettings.gps = val;
            }}
        />
        <Text styles={styles.text}>GPS Tracking</Text>
    </View>
}