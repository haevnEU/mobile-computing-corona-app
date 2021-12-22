import React, {useState} from "react";
import {Button, View, Text} from "react-native";
import { Card } from "react-native-elements";
import {
    getCountyInformationByName
} from "../../api/CountyDataController";
import {DataTable} from "react-native-paper";
import ApplicationData, {getMappedCounties} from "../../utils/ApplicationData";
import {SearchElement} from "../SearchElement/SearchElement";
import {styles} from "./CountyViewStyle";


const CountyDetailsView = (props) => {
    const [data] = useState(props.data);
    console.log(data);
    return (
        <DataTable>
            <DataTable.Row>
                <DataTable.Cell styles={[{color: "#ffffff"}]} >Einwohner</DataTable.Cell>
                <DataTable.Cell>{data['population']}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>Inzidenz</DataTable.Cell>
                <DataTable.Cell>{data['incidence']}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>Fälle gesamt</DataTable.Cell>
                <DataTable.Cell>{data['cases']}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>Fälle/Woche</DataTable.Cell>
                <DataTable.Cell>{data['casesPerWeek']}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>Tode</DataTable.Cell>
                <DataTable.Cell>{data['death']}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>Tode/Woche</DataTable.Cell>
                <DataTable.Cell>{data['deathPerWeek']}</DataTable.Cell>
            </DataTable.Row>
        </DataTable>
    )
}


const CountyView = () => {
    const [selectedCountyName, setSelectedCountyName] = useState(ApplicationData.county);
    const [selectedCountyData, setSelectedCountyData] = useState({});
    const [counties, setCounties] = useState({});
    const [initialized, setInitialized] = useState(false);
    const [showSearch, setShowSearch] = useState(true);

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
                    <CountyDetailsView data={selectedCountyData.data}/>
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