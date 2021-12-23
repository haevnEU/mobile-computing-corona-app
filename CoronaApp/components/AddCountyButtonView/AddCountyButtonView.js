import {styles} from "./AddCountyViewButtonStyle";
import React from "react";
import {Pressable, Text, View} from "react-native";

export const AddCountyButtonView = () => {

    return(
        <View >

            <Pressable style={styles.button} onPress={'onPress sollte die County Search aufgerufen werden'}>
            <Text style={styles.text}> Neuen Landreis hinzufügen</Text>
            </Pressable>
        </View>

    )

}

