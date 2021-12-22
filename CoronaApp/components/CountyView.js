import React, {useState} from "react";
import {Button, StyleSheet, View, Text} from "react-native";
import { Card } from "react-native-elements";
import {
    getCountyInformationByName
} from "../api/CountyDataController";
import {DataTable} from "react-native-paper";
import ApplicationData, {getMappedCounties} from "../utils/ApplicationData";
import {SearchElement} from "./SearchElement";

const Header = (props) => {
    return (
        <View>
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
            <View style={styles.card} containerStyle={styles.card}>
                <Card style={styles.card} >
                    <Card.Title>County Search</Card.Title>
                    <Card.Divider />
                    <SearchElement styles={styles.search_element} data={counties} county={selectedCountyName} setCounty={setSelectedCountyName}/>
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
                <Card style={styles.card} containerStyle={styles.card}>
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
        //width: Dimensions.get('window').width - 50,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    card_content: {
        position: "relative",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    card_text:{
        color: 'white'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 100,
    },

    search_element: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)'

    }

});

export {CountyView}