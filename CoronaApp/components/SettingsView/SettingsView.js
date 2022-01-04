import React, {useState} from "react";
import {View, Text, Switch} from "react-native";
import {Locator} from "../../services/LocationService";
import {styles} from "./SettingsViewStyle";
import {ImpressumView} from "./ImpressumView/ImpressumView";
import {FeedbackModalView} from "./FeedbackModalView/FeedbackModalView";
import {AppSettings} from "../../utils/ApplicationSettings";


/**
 * This component contains all elements for the application setting
 * @returns {JSX.Element} New React Native Custom settings component
 */
export const SettingsView = () => {
    const [gpsSwitchValue, setGpsSwitchValue] = useState(AppSettings.getGps());
    return (
        <View style={styles.container}>
            <View style={styles.settingsContainer}>
                <Switch
                    thumbColor={'#B6FC95'}
                    value={gpsSwitchValue}
                    onValueChange={gpsState => {
                        if (!gpsState) {
                            // Disable the gps module
                            AppSettings.setGps(false)
                            Locator.disable();
                            setGpsSwitchValue(false);
                        } else {
                            AppSettings.setGps(gpsState);
                            // Try to enable the gps module
                            Locator.request().then(result => {
                                setGpsSwitchValue(true);
                                AppSettings.setGps(result);
                            });
                        }
                    }}
                />
                <Text style={styles.text}>GPS Tracking</Text>
            </View>
            <View style={styles.buttonContainer}>
                <FeedbackModalView/>
                <ImpressumView/>
            </View>
        </View>
    )
}
