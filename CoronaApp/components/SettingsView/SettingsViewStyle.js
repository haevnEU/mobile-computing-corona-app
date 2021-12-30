import {StyleSheet} from "react-native";
import {Locator} from "../../services/LocationService";

export const styles = StyleSheet.create({
    container:{
        height: '88.3%',
        width: '90%',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 25,
        margin: 10,
        backgroundColor: '#4a4a4a',
        borderColor: 'white',
        borderWidth: 1,

    },

    settingsContainer:{
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        margin: 10,
        backgroundColor: '#4a4a4a',
    },

    text:{
        color: "red",
        margin: 10,
        fontSize: 20
    },

    input:{
    },

    switch:{
        color: "#ff00ff"

    },

});
