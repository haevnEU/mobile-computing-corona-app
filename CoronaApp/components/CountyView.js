import React from "react";
import {Button, StyleSheet, View, Text, TextInput, Dimensions} from "react-native";
import {getCityName} from "../services/Locate";
import { Card } from "react-native-elements";
import {getCountyInformationByName} from "../api/CountyDataController";
import {DataTable} from "react-native-paper";
import ApplicationData from "../utils/ApplicationData";

class CountyView extends React.Component{
    text = "";
    data = null;
    initial = true;
    async loadByName(name){
        this.text = "Load data";

        // When an invalid name is provided show an exception message
        if(undefined === name || null === name){
            this.text = "Enter a county name"
            return;
        }
        console.log("Load for " + name)
        try{
            this.data = await getCountyInformationByName(name);
        }catch (ex){
            this.text= ex.message;
            this.data = null;
        }
        this.forceUpdate();
    }


    async loadByCoordinate(long, lat) {
        try {
            let currentCity = await getCityName(long, lat);
            return this.loadByName(currentCity);
        } catch (ex) {
            this.text= ex.message;
            this.data = null;
        }
    }

    async loadByGps(){
        try {
            let currentCity = await getCityName();
            return this.loadByName(currentCity);
        } catch (ex) {
            this.text= ex.message;
            this.data = null;
        }
    }

    createElements(){
        let data = this.data.data;
        return   <DataTable>
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
    }

    render(){
        let data = this.data;
        if(data !== null) {
            return <View>
                <TextInput placeholder={ApplicationData.county}   onChangeText={text => ApplicationData.county = text}/>
                <Card style={styles.card} containerStyle={{width: Dimensions.get('window').width - 50}}>
                    <View style={styles.card_header}>
                        <Card.Title>{data.name}</Card.Title>
                        <Text>{data.state}</Text>
                    </View>
                    <Card.Divider />
                    <View style={styles.card_content}>
                        {this.createElements()}
                    </View>
                <Card.Divider />
                <Button onPress={() => this.loadByName(ApplicationData.county)} title="Load Data"/>
                </Card>

            </View>
        }else return<View>
            <Card style={styles.card} containerStyle={{width: Dimensions.get('window').width - 50}}>
                <View style={styles.card_header}>
                    <Card.Title>County search</Card.Title>
                </View>
                <Card.Divider />
                <View style={styles.card_content}>
                    <TextInput placeholder="Enter a search county" onChangeText={text => ApplicationData.county = text}/>
                    <Text>{this.text}</Text>
                </View>
                <Card.Divider />
                <Button onPress={() => this.loadByName(ApplicationData.county)} title="Load Data"/>
            </Card>

        </View>
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