import React, {useState} from 'react';
import {Modal, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {styles} from "./FeedBackModalViewStyle";



export const FeedbackModalView = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [feedBackText, onChangeText] = useState([])
    return(
        <View >

            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modal}>
                    <Text style={styles.modalTextBold}>Feedback</Text>
                    <TextInput
                        style={[styles.input, styles.text]}
                        multiline={true}
                        placeholder="Feedback eingeben"
                        />
                    <View style={styles.container}>
                    <TouchableHighlight
                        style={styles.buttonContainer}

                        onPress={() => {
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

