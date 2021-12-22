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
import ApplicationData from "../utils/ApplicationData";


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

const CountyViewNew = (props) => {
    const [data] = useState(props.data);
    if (showDetail) {
        return (
            <View>
                <TextInput placeholder={ApplicationData.county} onChangeText={text => ApplicationData.county = text}/>
                <Card style={styles.card} containerStyle={{width: Dimensions.get('window').width - 50}}>
                    <Header title={data.name} subtitle={data.state}/>
                    <Card.Divider/>
                    <CountyDetailsView data={data.data}/>
                    <Card.Divider/>
                    <Button onPress={() => setShowDetail(false)} title="Open Search"/>
                </Card>
            </View>
        )
    } else {
        return <View/>
    }
}

const CountySearch = (props) => {
    return (
        <View>
            <Card style={styles.card} containerStyle={{width: Dimensions.get('window').width - 50}}>
                <Header title="County Search" />
                <Card.Divider />
                <View style={styles.card_content}>
                    <TextInput placeholder="Enter a search county" onChangeText={text => ApplicationData.county = text}/>
                    <Text>{props.text}</Text>
                </View>
                <Card.Divider />
                <Button onPress={() => loadByName(ApplicationData.county)} title="Load Data"/>
            </Card>
        </View>
    )
}


function loadByName(name) {
    // When an invalid name is provided show an exception message
    if (undefined === name || null === name) {
        return;
    }

    getCountyInformationByName(name).then(result => setData(result));
}

class CountyView extends React.Component{
    text = "";
    data = null;
    initial = true;

    async loadByName(name){
        // When an invalid name is provided show an exception message
        if(undefined === name || null === name){
            this.text = "Enter a county name"
            return;
        }

        // Try to receive information for a county, if the operation fails activate the error message
        try{
            this.data = await getCountyInformationByName(name);
        }catch (ex){
            this.text = ex.message;
            this.data = null;
        }
        this.forceUpdate();
    }

    async loadByCoordinate(long, lat) {

        // Try to receive information for a county, if the operation fails activate the error message
        try {
            this.data = await getCountyInformationByCoordinate(long, lat);
        } catch (ex) {
            this.text= ex.message;
            this.data = null;
        }
        this.forceUpdate();
    }

    async loadByGps(){
        try {
            // Locate the user and use the received county as location
            let currentCity = await locate();
            return this.loadByName(currentCity);
        } catch (ex) {
            this.text= ex.message;
            this.data = null;
        }
    }


    async mapData(){
        let array = await getAllCounties();
        array = array.filter((value, index) => array.indexOf(value) === index);
        let updated = [];
        for (let i = 0; i < array.length; i++) {
            const value = array[i];
            updated.push({ "key": value });
        }
        return updated;
    }


    render(){

        let data = this.data;
        if(data !== null) {
            return <CountyViewNew visibility={true} data={data} show={false}/>
        }else return <CountySearch text="" />
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