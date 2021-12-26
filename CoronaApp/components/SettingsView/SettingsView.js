import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import { Switch } from "react-native-elements";
import {ApplicationSettings} from "../../utils/ApplicationData";
import {styles} from "./SettingsViewStyle";
import {Locator} from "../../services/LocationService";


export const SettingsView = () => {
    const [gpsEnabled, setGpsEnabled] = useState(ApplicationSettings.gps);
    useEffect(() =>{

        setGpsEnabled(Locator.isGranted());

        }, []);

    return <View style={styles.container}>
        <Switch style={[styles.switch]}
            color="#2089dc"
            value={gpsEnabled}
            onValueChange={(val) => {
                if(!val){
                    Locator.disable();
                    setGpsEnabled(Locator.isGranted());
                }else{
                    Locator.request().then(() => setGpsEnabled(Locator.isGranted()));
                }
            }}
        />
        <Text styles={styles.text}>GPS Tracking</Text>
    </View>
}