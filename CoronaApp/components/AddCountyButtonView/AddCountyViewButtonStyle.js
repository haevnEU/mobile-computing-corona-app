import {StyleSheet} from "react-native";
import {ITEM_WIDTH} from "../../utils/ApplicationData";

export const styles = StyleSheet.create({
    button:{
        width: ITEM_WIDTH,
        height: 80,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: "center",
        borderRadius: 40,
        marginTop: 20,
        backgroundColor: '#B6FC95'
    },
    text:{
        alignSelf: 'center',
        fontWeight: "bold",
        color: '#2d2d2d',
        fontSize: 20
    }

});
