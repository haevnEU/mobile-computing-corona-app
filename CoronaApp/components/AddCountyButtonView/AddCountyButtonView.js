import {styles} from "./AddCountyViewButtonStyle";
import React from "react";
import {Pressable, Text, View} from "react-native";

// TODO Comment

export const AddCountyButtonView = (props) => {

    return(
        <View >
            <Pressable style={styles.button} onPress={() => props.addPressed()}>
            <Text style={styles.text}> Neuen Landkreis hinzufügen</Text>
            </Pressable>
        </View>

    )

}

