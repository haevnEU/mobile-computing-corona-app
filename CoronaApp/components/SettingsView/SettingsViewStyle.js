import {StyleSheet} from "react-native";
import {isWeb} from "../../utils/GeneralUtils";

export const styles = StyleSheet.create({
    container:{
        height: '88.3%',
        width: '90%',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 25,
        margin: 5,
        backgroundColor: '#4a4a4a',
        borderColor: 'white',
        borderWidth: 1,

    },

    settingsContainer:{
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        margin: 5,
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
    },

});
