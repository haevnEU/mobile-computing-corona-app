import React from "react";
import RkiServerDataController from "../api/RkiServerDataController";
import {Button, StyleSheet, View, Text} from "react-native";
import LocationService from "../services/LocationService";
import { Card } from "react-native-elements";

class CityView extends React.Component{

    data = null;
    state = 0;
    async loadData(){
        let coordinates = await LocationService();
        this.data = await RkiServerDataController(coordinates.long, coordinates.lat);
        if(this.data !== null) {
            this.state = 2;
        }
        this.forceUpdate();
    }


    render(){
        let data = this.data;
        if(this.data !== null) {
            return <View style={{width: '95%'}}>
                <Card.Title style={styles.card_place}> <Card.Title style={styles.card_title}> Inzidenz </Card.Title>{data.city.name}</Card.Title>
                    <View style={styles.card_content}>
                        <Text style={styles.card_text}>Fälle insgesamt: {data.city.cases7}</Text>
                        <Text style={styles.card_text}>Fälle/100k: {(Math.round(data.city.cases7_per_100k * 100) / 100).toFixed(2)}</Text>
                        <Text style={styles.card_text}>Tode/7t.: {data.city.death}</Text>
                    </View>

                <Card.Title style={styles.card_place}> <Card.Title style={styles.card_title}> Inzidenz </Card.Title>{data.state.name}</Card.Title>
                    <View style={styles.card_content}>
                        <Text style={styles.card_text}>Fälle insgesamt: {data.state.cases7}</Text>
                        <Text style={styles.card_text}>Fälle/100k: {(Math.round(data.state.cases7_per_100k * 100) / 100).toFixed(2)}</Text>
                        <Text style={styles.card_text}>Tode/7t.: {data.state.death}</Text>
                    </View>
                <Text style={{color: 'white'}}>Datasource: {data.last_data_update}</Text>
                <Text style={{color: 'white'}}>Last update: {data.last_app_update}</Text>
                <Button onPress={() => this.loadData()} title="Reload Data"/>

            </View>
        }else return<View>
            <Button onPress={() => this.loadData()} title="Load Data"/>
            </View>
    }
}

// <Text style={styles.card_text}>Einwohner: {data.state.citizen}</Text>
const styles = StyleSheet.create({
    card:{
        width: '100%',
        backgroundColor: "#2D2D2D",
        borderRadius: 5
    },
    card_content: {
        backgroundColor: "#4A4A4A",
        height: '20%',
        position: "relative",
        alignItems: "center",
        marginBottom: '5%',
        paddingTop: 7,
        borderRadius: 15
    },
    card_text:{
        color: 'white',
        fontSize: 20
    },
    card_title:{
        color: 'white',
        fontSize: 25,
        alignSelf: 'flex-start'
    },
    card_place:{
        color: '#686868',
        fontSize: 20,
        alignSelf: 'flex-start'
    }
});

export {CityView};
