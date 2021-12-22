import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 100,
    },

    text:{
        color: "#ffffff",
        fontSize:28
    },

    title:{
        color: "#ffffff",
        fontSize:28
    },

    headline:{
        color: "#ffffff",
        fontSize:32,
        textAlign: "center"
    },

    input: {
    },

    suggestions: {},

    suggestion_entry: {
        textAlign: 'center',
    },


    card:{
        //width: Dimensions.get('window').width - 50,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
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
