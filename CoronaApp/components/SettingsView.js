import React from "react";
import {StyleSheet, View, Text} from "react-native";
import { Switch } from "react-native-elements";

class SettingsView extends React.Component{

    gpsEnabled = false;

    toggleGps(){
        this.gpsEnabled = !this.gpsEnabled;
        this.forceUpdate()
    }

    render(){
        return <View style={styles.container}>

            <Switch
                color="#2089dc"
                value={this.gpsEnabled}
                onValueChange={() => this.toggleGps()}
            />
            <Text>GPS Tracking</Text>
            </View>
    }
}


const styles = StyleSheet.create({

    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
});

export {SettingsView};