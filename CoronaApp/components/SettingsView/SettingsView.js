import React from "react";
import {View, Text, Switch} from "react-native";
import {Locator} from "../../services/LocationService";
import {styles} from "./SettingsViewStyle";
import {ImpressumView} from "./ImpressumView/ImpressumView";
import {FeedbackView} from "./FeedbackView/FeedbackView";

/**
 * This component contains all elements for the application setting
 * @returns {JSX.Element} New React Native Custom settings component
 */
export const SettingsView = (props) => {
    let gps = props.gps[0];
    let gpsToggle = props.gps[1];
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
