import React, {useEffect, useState} from "react";
import {Button, View, Text} from "react-native";
import { Card, Divider } from "react-native-elements";
import {
    getCountyInformationByName, getMappedCounties
} from "../../api/CountyDataController";
import {SearchElement} from "../SearchElement/SearchElement";
import {styles} from "./CountyViewStyle";
import {CustomTable} from "../CustomTable/CustomTable";
import ApplicationData from "../../utils/ApplicationData";


const CountyDetailsView = (props) => {
    const [data] = useState(props.data);
    return (<View>
            <CustomTable data={data} />
       </View>
    )
}
const createDisplayData = (data)=>{
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
    const [initialized, setInitialized] = useState(false);
    const [showSearch, setShowSearch] = useState(true);
    const [displayData, setDisplayData] = useState([]);
    if(!initialized){
        getMappedCounties().then(result => setCounties(result));

        setInitialized(true);
    }

    if (showSearch) {
        return (
            <View>
                <Card style={[styles.card, styles.text, styles.headline]}  containerStyle={styles.card}>
                    <Card.Title style={[styles.headline]}>County Search</Card.Title>
                    <Card.Divider />
                    <SearchElement styles={styles.search_element} data={counties} county={selectedCountyName} setCounty={setSelectedCountyName}/>
                    <Card.Divider />
                    <Button styles={[styles.text]} onPress={() => {
                        getCountyInformationByName(selectedCountyName).then(result => {
                            setSelectedCountyData(result);
                            setShowSearch(false);
                            const tp = createDisplayData(result.data);
                            setDisplayData(tp)
                            console.log(showSearch);
                        });
                    }} title="Search"/>
                </Card>
            </View>
        )
    } else {
        return (
            <View>
                <Card style={styles.card} containerStyle={styles.card}>
                    <Card.Title style={[styles.text, styles.headline]}>{selectedCountyData.name}</Card.Title>
                    <Text style={[styles.text, styles.headline]}>{selectedCountyData.state}</Text>
                    <Card.Divider/>
                    <CustomTable data={displayData} />

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
