import React, {useEffect, useState} from "react";
import {Button, View, Text, ActivityIndicator} from "react-native";
import {Card} from "react-native-elements";
import {getCountyInformationByName, getMappedCounties} from "../../api/CountyDataController";
import {SearchElement} from "../SearchElement/SearchElement";
import {styles} from "./CountyViewStyle";
import {CustomTable} from "../CustomTable/CustomTable";
import ApplicationData from "../../utils/ApplicationData";
import {Locator} from "../../services/LocationService";

const createDisplayData = (data) => {
   return [
        {
            "key": "Einwohner",
            "value": data['population']
        },
        {
            "key": "Inzidenz",
            "value": data['incidence']
        },
        {
            "key": "Fälle gesamt",
            "value": data['cases']
        },
        {
            "key": "Fälle/Woche",
            "value": data['casesPerWeek']
        },
        {
            "key": "Tode",
            "value": data['death']
        },
        {
            "key": "Tode/Woche",
            "value": data['deathPerWeek']
        }
    ]
}

const CountyView = () => {
    const [selectedCountyName, setSelectedCountyName] = useState(ApplicationData.county);
    const [selectedCountyData, setSelectedCountyData] = useState({});
    const [counties, setCounties] = useState({});
    const [showSearch, setShowSearch] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        getMappedCounties().then(result => setCounties(result))
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

                    <Card.Divider/>{
                    loading && (<View>
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
                <Card containerStyle={styles.card}>
                    <Card.Title style={[styles.title]}>{selectedCountyData.name}</Card.Title>
                    <Text style={[styles.subtitle]}>{selectedCountyData.state}</Text>
                    <Card.Divider/>
                    <CustomTable data={createDisplayData(selectedCountyData.data)} />
                    <Card.Divider/>
                    <Button onPress={() => {
                        setShowSearch(true);
                    }} title="Search again"/>
                </Card>
            </View>
        )
    }
}


export {CountyView}
