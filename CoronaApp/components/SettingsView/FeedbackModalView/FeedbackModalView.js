import React, {useState} from 'react';
import {Modal, Text, TextInput, View} from 'react-native';
import {toastingBad, toastingGood, toastingWarning} from "../../../utils/GeneralUtils";
import {styles} from "./FeedbackModalViewStyle";
import {CustomButton} from "../../customElements/CustomButton/CustomButton";

const sendFeedback = async (text) => {
    console.log(text)
    if(null === text || text === "" || !text.replace(/\s/g, '').length){
        toastingWarning("Das Feedback muss mindestens ein Zeichen enthalten")
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
    }).then(() => toastingGood("Feedback erhalten"))
        .catch(() => toastingBad("Feedback konnte nicht gesendet werden")).finally(() => true);

}

export const FeedbackModalView = () => {    const [modalVisible, setModalVisible] = useState(false);
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
                        <CustomButton text={"Abschicken"} onPress={() => {
                            sendFeedback(text).then(setText(""));
                            setModalVisible(!modalVisible);
                        }} />

                        <CustomButton text={"Schließen"} onPress={() => {setModalVisible(!modalVisible)}}/>
                    </View>
                </View>
            </Modal>
            <CustomButton text="Feedback" onPress={() => {setModalVisible(true)}} />
        </View>
    );
}
