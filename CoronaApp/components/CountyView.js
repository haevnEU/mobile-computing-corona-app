import React, {useState} from "react";
import {Button, StyleSheet, View, Text, TextInput, Dimensions} from "react-native";
import {locate} from "../services/LocationService";
import { Card } from "react-native-elements";
import {
    getAllCounties,
    getCountyInformationByCoordinate,
    getCountyInformationByName
} from "../api/CountyDataController";
import {DataTable} from "react-native-paper";
import ApplicationData, {getMappedCounties} from "../utils/ApplicationData";
import {SearchElement} from "./SearchElement";


const Header = (props) => {
    return (
        <View style={styles.card_header}>
            <Card.Title>{props.title}</Card.Title>
            <Text>{props.subtitle}</Text>
        </View>
    )
}

const CountyDetailsView = (props) => {
    const [data] = useState(props.data);
    return (
        <View style={styles.card_content}>
            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell>Einwohner</DataTable.Cell>
                    <DataTable.Cell>{data['population']}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Inzidenz</DataTable.Cell>
                    <DataTable.Cell>{data['incidence']}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Fälle</DataTable.Cell>
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
                <DataTable.Row>
                    <DataTable.Cell>Genesen</DataTable.Cell>
                    <DataTable.Cell>{data['recovered']}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Fälle/100k Einwohner</DataTable.Cell>
                    <DataTable.Cell>{data['casesPer100k']}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </View>
    )
}


const CountyView = () => {
    const [selectedCountyName, setSelectedCountyName] = useState("Berlin Mitte");
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
                <Card style={styles.card} containerStyle={{width: Dimensions.get('window').width - 50}}>
                    <Header title="County Search" />
                    <Card.Divider />
                    <View style={styles.card_content}>
                        <SearchElement data={counties} county={selectedCountyName} setCounty={setSelectedCountyName}/>
                    </View>
                    <Card.Divider />
                    <Button onPress={() => {
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
                <Card style={styles.card} containerStyle={{width: Dimensions.get('window').width - 50}}>
                    <Header title={selectedCountyData.name} subtitle={selectedCountyData.state}/>
                    <Card.Divider/>
                    <CountyDetailsView data={selectedCountyData.data}/>
                    <Card.Divider/>
                    <Button onPress={() => {
                        ApplicationData.county = "Berlin Mitte";
                        setShowSearch(true);
                    }} title="Search again"/>
                </Card>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    card:{
        marginLeft:0,
        marginRight:0,
        width:100
    },
    card_header:{
        position: "relative",
        alignItems: "center"
    },
    card_content: {
        position: "relative",
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 100,
        backgroundColor: '#ecf0f1',
    },
});

export {CountyView}