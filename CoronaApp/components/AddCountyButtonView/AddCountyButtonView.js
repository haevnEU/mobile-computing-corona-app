import {styles} from "./AddCountyViewButtonStyle";
import React from "react";
import {Pressable, Text, View} from "react-native";

// TODO Comment

export const AddCountyButtonView = (props) => {

    return(
        <View >
            <Pressable style={styles.button} onPress={() => 'onPress sollte die County Search aufgerufen werden'}>
            <Text style={styles.text}> Neuen Landreis hinzufügen</Text>
            </Pressable>
        </View>

    )

}

