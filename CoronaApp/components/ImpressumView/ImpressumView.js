import React, {useState} from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {styles} from "./ImpressumViewStyle";



export const ImpressumView = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View >

            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modal}>
                    <Text style={styles.modalTextBold}>Impressum</Text>
                    <Text style={styles.modalText}>{'\n Hochschule Ruhr West \n Duisburger Straße 100 \n 45479 Mülheim an der Ruhr \n ' +
                    '\n Erstellt durch: \n Nils Milewski \n Lucas Lichner\n\n'
                    }</Text>
                    <TouchableHighlight
                        style={styles.buttonContainer} onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                        <Text style={{fontSize:20}}>Schließen</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
            <TouchableHighlight style={styles.buttonContainer}
                                onPress={() => {
                                    setModalVisible(true);
                                }}>
                <Text style={{fontSize: 20}}>Impressum</Text>
            </TouchableHighlight>
        </View>

    );

}

