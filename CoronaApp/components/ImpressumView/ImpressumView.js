import React, {useState} from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {styles} from "./ImpressumViewStyle";



export const ImpressumView = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return(
                <View >

                    <Modal visible={modalVisible} presentationStyle={'formSheet'} style={styles.modal}>
                        <View style={{margin: 50}}>
                                <Text style={styles.modalTextBold}>Impressum</Text>
                                <Text style={styles.modalText}>{'\n Hochschule Ruhr West \n Duisburger Straße 100 \n 45479 Mülheim an der Ruhr \n ' +
                                'Erstellt durch: \n Nils Milewski \n Lucas Lichner\n\n'
                                }</Text>
                                <TouchableHighlight
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <Text style={styles.modalTextBold}>Schließen</Text>
                                </TouchableHighlight>
                        </View>
                    </Modal>
                    <TouchableHighlight style={styles.container}
                                        onPress={() => {
                                            setModalVisible(true);
                                        }}>
                        <Text>Impressum</Text>
                    </TouchableHighlight>
                </View>

            );

}
