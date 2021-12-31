import {toastingBad, toastingGood, toastingWarning} from "../../../utils/GeneralUtils";
import React, {useState} from "react";
import {Button, Text, TextInput, View} from "react-native";
import {styles} from "./FeedbackViewStyle";

const sendFeedback = async (text) => {
    if(null === text || text === "" || !text.replace(/\s/g, '').length){
        toastingWarning("Cannot send empty feedback")
        return true;
    }
    fetch('https://hrwmobilecomputingproject2022.free.beeceptor.com/feedback', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            feedback: text
        })
    }).then(() => toastingGood("Feedback received"))
        .catch(() => toastingBad("Cannot send feedback")).finally(() => true);

}

export const FeedbackView = () => {
    const [feedback, setFeedback] = useState("");

    return (
        <View>
            <View style={styles.settingsContainer}>
                <Text style={styles.text}> Feedback</Text>
                <TextInput multiline={true} value={feedback} onChangeText={(text) => setFeedback(text)}/>
            </View>
            <Button title="Send"
                    onPress={
                        () => {
                            sendFeedback(feedback).then();
                            setFeedback("")
                        }
                    }
            />
        </View>
    )
}