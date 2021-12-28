import React, {useEffect, useState} from "react";
import {Button, View, Text, ActivityIndicator} from "react-native";
import {Card} from "react-native-elements";
import {getCountyInformationByName, getCountyListAsProcessableJsonObject} from "../../api/CountyDataController";
import {SearchElement} from "../SearchElement/SearchElement";
import {styles} from "./CountyViewStyle";
import ApplicationData, {ApplicationSettings} from "../../utils/ApplicationData";
import {Locator} from "../../services/LocationService";
import {CustomCountyCard} from "../CustomCountyCard/CustomCountyCard";

/**
 * This is a custom react native component.<br>
 * The component contains a search view for a county and a detail view about a county.<br>
 * Searching can be done manually by entering a county name or via the location service of the device.
 * @returns {JSX.Element}
 */
const CountyView = () => {
    /**
     * This attribute is used to determine a loading state. <br>
     * If true a loading animation will be displayed and the search and locate button are disabled
     */
    const [loading, setLoading] = useState(false);
    const [currentlySelectedCountyName, setCurrentlySelectedCountyName] = useState(ApplicationData.county);
    const [currentlySelectedCountyData, setCurrentlySelectedCountyData] = useState({});
    const [countyList, setCountyList] = useState({});
    const [showSearch, setShowSearch] = useState(true);


    // Request and set the county list once the code is called
    useEffect(async () => {
        getCountyListAsProcessableJsonObject().then(result => setCountyList(result))
    }, [])

    // Toggle the view between a search view and a county details view
    if (showSearch) {
        return (
            <View>
                <Card containerStyle={styles.card}>
                    <Card.Title style={[styles.title]}>County Search</Card.Title>
                    <Card.Divider/>
                    <SearchElement styles={styles.search_element}
                                   data={countyList}
                                   currentlySelectedCountyName={currentlySelectedCountyName}
                                   setCurrentlySelectedCountyName={setCurrentlySelectedCountyName}/>

                    <Card.Divider/>
                    {
                        loading && (
                            <View>
                                <ActivityIndicator size={"large"}/>
                                <Text style={[styles.text]}>Locating device using V8 turbo</Text>
                            </View>
                        )
                    }
                    <View style={[styles.button_container]}>
                        {ApplicationSettings.gps && (
                            <Button title="Locate"
                                 styles={[styles.text, styles.button]}
                                 disabled={loading && ApplicationSettings.gps}
                                 onPress={() => {
                                     if(ApplicationSettings.gps) {
                                         // Display loading state while the current city is located
                                         setLoading(true);
                                         Locator.getCurrentLocationName().then(result => {
                                             // The current county is located so disable search animation and update
                                             // the currently selected county name
                                             setCurrentlySelectedCountyName(result);
                                             setLoading(false);
                                         });
                                     }
                                 }}
                        />)
                        }
                        <Button styles={[styles.text, styles.button]}
                                disabled={loading}
                                onPress={() => {
                                    getCountyInformationByName(currentlySelectedCountyName).then(result => {
                                        // The data is loaded and now stored inside the county data
                                        // this implies that the search view is no longer required => hide it
                                        setCurrentlySelectedCountyData(result);
                                        setShowSearch(false);
                                    });
                                }} title="Search"/>
                    </View>
                </Card>
            </View>
        )
    } else {
        return (
            <View>
                <CustomCountyCard county={currentlySelectedCountyData} onButton={() => setShowSearch(true)} buttonText={"Search again"} />
            </View>
        )
    }
}

export {CountyView}
