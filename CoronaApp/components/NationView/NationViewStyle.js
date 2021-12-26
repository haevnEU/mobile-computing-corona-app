import {StyleSheet} from "react-native";
import {ITEM_WIDTH} from "../../utils/ApplicationData";

export const styles = StyleSheet.create({
    container:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    text:{
        color: "#ffffff",
        fontSize: 25
    },
    input: {
    },
    switch:{
    },
    card:{
        width: ITEM_WIDTH,
        backgroundColor: '#4A4A4A',
        borderRadius: 25
    },
    card_content: {
        position: "relative",
        alignItems: "center",
    },
    card_text:{
        color: 'white'
    }

});
