import {StyleSheet} from "react-native";
import {ITEM_WIDTH} from "../../utils/ApplicationData";

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 100,
    },

    button_container:{
        flexDirection: 'row',
        justifyContent: 'center'
    },

    button:{
        alignItems: 'center'
    },

    text:{
        color: "#ffffff",
        fontSize:22,
        textAlign: "center"
    },

    title:{
        color: "#ffffff",
        textAlign: "center",
        fontSize:28
    },

    subtitle:{
        color: "#ffffff",
        textAlign: "center",
        fontSize:25
    },

    card:{
        width: ITEM_WIDTH,
        backgroundColor: '#4A4A4A',
        borderRadius: 25
    },

    card_content: {
        position: "relative",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },

    card_text:{
        color: 'white'
    },

    search_element: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)'

    }

});
