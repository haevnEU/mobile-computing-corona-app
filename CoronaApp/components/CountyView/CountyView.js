import React, {useEffect, useState} from "react";
import {Button, View, Text, ActivityIndicator} from "react-native";
import {Card} from "react-native-elements";
import {getCountyInformationByName, getCountyListAsProcessableJsonObject} from "../../api/CountyDataController";
import {SearchElement} from "../SearchElement/SearchElement";
import {styles} from "./CountyViewStyle";
import ApplicationData from "../../utils/ApplicationData";
import {Locator} from "../../services/LocationService";
import {CustomCountyCard} from "../CustomCountyCard/CustomCountyCard";


const CountyView = () => {
    const [selectedCountyName, setSelectedCountyName] = useState(ApplicationData.county);
    const [selectedCountyData, setSelectedCountyData] = useState({});
    const [counties, setCounties] = useState({});
    const [showSearch, setShowSearch] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        getCountyListAsProcessableJsonObject().then(result => setCounties(result))
    }, [])


    if (showSearch) {
        return (
            <View>
                <Card containerStyle={styles.card}>
                    <Card.Title style={[styles.title]}>County Search</Card.Title>
                    <Card.Divider/>
                    <SearchElement styles={styles.search_element}
                                   data={counties}
                                   county={selectedCountyName}
                                   setCounty={setSelectedCountyName}/>

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
                        <Button title="Locate"
                                styles={[styles.text, styles.button]}
                                disabled={loading}
                                onPress={
                                    () => {
                                        setLoading(true);
                                        Locator.getCurrentCityName().then(result => {
                                            setSelectedCountyName(result);
                                            setLoading(false);
                                        });
                                    }
                                }
                        />

                        <Button styles={[styles.text, styles.button]}
                                disabled={loading}
                                onPress={() => {
                                    getCountyInformationByName(selectedCountyName).then(result => {
                                        setSelectedCountyData(result);
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
                <CustomCountyCard county={selectedCountyData} onButton={() => setShowSearch(true)} buttonText={"Search again"} />
            </View>
        )
    }
}


export {CountyView}
