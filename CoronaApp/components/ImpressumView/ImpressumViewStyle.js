import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container:{
        marginTop: 25,
        height: 50,
        width: 150,
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'white',
        alignSelf: "center"
    },

    modalText:{
        color: '#2d2d2d',
        fontSize:25,
        alignSelf: "center"
    },

    modalTextBold:{
        color: '#2d2d2d',
        fontSize:25,
        fontWeight: 'bold',
        alignSelf: "center"
    },

    modal: {
        backgroundColor: 'black',
        margin: 100,
        paddingTop: 500,
        alignItems: undefined,
        justifyContent: undefined,
        backdropColor: 'black',
        backdropOpacity: 1,
    }

});
