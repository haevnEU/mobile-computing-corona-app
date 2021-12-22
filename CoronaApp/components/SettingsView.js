import React, {useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import { Switch } from "react-native-elements";
import {ApplicationSettings} from "../utils/ApplicationData";



export const SettingsView = () => {
    const [gpsEnabled, setGpsEnabled] = useState(ApplicationSettings.gps);
    const [initialized, setInitialized] = useState(false);
    if(!initialized){
        setGpsEnabled(ApplicationSettings.gps);
        setInitialized(true);
    }

    return <View style={styles.container}>

        <Switch
            color="#2089dc"
            value={gpsEnabled}
            onValueChange={(val) => {
                setGpsEnabled(val);
                ApplicationSettings.gps = val;
            }}
        />
        <Text>GPS Tracking</Text>
    </View>
}



const styles = StyleSheet.create({

    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
});
