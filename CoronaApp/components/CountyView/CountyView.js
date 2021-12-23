import React, {useState} from "react";
import {Button, View, Text} from "react-native";
import { Card, Divider } from "react-native-elements";
import {
    getCountyInformationByName
} from "../../api/CountyDataController";
import {DataTable} from "react-native-paper";
import ApplicationData, {getMappedCounties} from "../../utils/ApplicationData";
import {SearchElement} from "../SearchElement/SearchElement";
import {styles} from "./CountyViewStyle";
import {CustomTable} from "../CustomTable/CustomTable";

const createRow = (key, value) => {
    return ( <View
        style={{ padding: 10,
            flexDirection: "row"
        }}
    >
        <Text style={{flex: 0.5, color: "#ffffff", fontSize:28}} >{key}</Text>
        <Text style={{flex: 0.5, color: "#ffffff", fontSize:28}} >{value}</Text>
    </View>
);
}

const CountyDetailsView = (props) => {
    const [data] = useState(props.data);
    return (<View>
            <CustomTable data={data} />

    </View>
    )
}
const createDisplayData = (data)=>{
   const tmp = [
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
   return tmp;
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
                            setDisplayData(createDisplayData(result.data))
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
                    <CountyDetailsView data={displayData}/>
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