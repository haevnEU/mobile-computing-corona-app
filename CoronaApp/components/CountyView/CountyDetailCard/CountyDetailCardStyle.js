import {StyleSheet} from "react-native";
import {CARD_ITEM_WIDTH, isMobile} from "../../../utils/GeneralUtils";


export const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },

    button_container:{
        flexDirection: 'row',
        justifyContent: 'center',
        width: 50,
        alignSelf: 'center'
    },

    button:{
        alignItems: 'center',
        margin: 5,
        width: 50,
        color: 'white'
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
        fontSize: 25
    },

    card:{
        width: (isMobile() ? CARD_ITEM_WIDTH : '90%'),
        alignSelf: 'center',
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
