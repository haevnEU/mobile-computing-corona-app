import React, {useState} from "react";
import {View, Text, Switch, Button, TextInput} from "react-native";
import {Locator} from "../../services/LocationService";
import {styles} from "./SettingsViewStyle";
import {ImpressumView} from "./ImpressumView/ImpressumView";
import {Input} from "react-native-elements";
import {toastingBad, toastingGood} from "../../utils/GeneralUtils";
import {FeedbackView} from "./FeedbackView/FeedbackView";

const send = async (text) => {
    fetch('https://hrwmobilecomputingproject2022.free.beeceptor.com/feedback', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            feedback: text
        })
    }).then(response => toastingGood("Feedback received")).catch(error => toastingBad("Cannot send feedback"));
}

/**
 * This component contains all elements for the application setting
 * @returns {JSX.Element} New React Native Custom settings component
 */
export const SettingsView = (props) => {
    let gps = props.gps[0];
    let gpsToggle = props.gps[1];
    const [feedback, setFeedback] = useState("");
    return (
        <View style={styles.container}>
            <View style={styles.settingsContainer}>
                <Switch
                    thumbColor={Locator.isGranted() ? "green" : "gray"}

                    value={gps}
                        onValueChange={gpsState => {
                            if (!gpsState) {
                                // Disable the gps module
                                Locator.disable();
                                gpsToggle(Locator.isGranted());
                            } else {
                                // Try to enable the gps module
                                Locator.request().then(() => gpsToggle(Locator.isGranted()));
                            }
                        }}
                />


                <Text style={styles.text}> GPS Tracking</Text>
            </View>
            <ImpressumView/>
            <FeedbackView />

        </View>
    )
}
