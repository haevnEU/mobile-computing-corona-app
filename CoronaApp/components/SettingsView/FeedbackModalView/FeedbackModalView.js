import React, {useState} from 'react';
import {Modal, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {toastingBad, toastingGood, toastingWarning} from "../../../utils/GeneralUtils";
import {styles} from "./FeedbackModalViewStyle";

const sendFeedback = async (text) => {
    console.log(text)
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

export const FeedbackModalView = () => {    const [modalVisible, setModalVisible] = useState(false);
    const [feedBackText, onChangeText] = useState([])
    const [text, setText] = useState("");
    return(
        <View >

            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modal}>
                    <Text style={styles.modalTextBold}>Feedback</Text>
                    <TextInput
                        style={[styles.input, styles.text]}
                        value={text}
                        onChangeText={(input) => setText(input)}
                        multiline={true}
                        placeholder="Feedback eingeben"
                    />
                    <View style={styles.container}>
                        <TouchableHighlight
                            style={styles.buttonContainer}

                            onPress={() => {
                                sendFeedback(text).then(setText(""));
                                onChangeText(onChangeText)
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={{fontSize:20, color: feedBackText}}>Abschicken</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.buttonContainer} onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                            <Text style={{fontSize:20}}>Schließen</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>


            <TouchableHighlight style={styles.buttonContainer}
                                onPress={() => {
                                    setModalVisible(true);
                                }}>
                <Text style={{fontSize: 20}}>Feedback geben</Text>
            </TouchableHighlight>

        </View>

    );
}