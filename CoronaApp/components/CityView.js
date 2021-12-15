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
        console.log(this.state);
        if(this.data !== null) {
            return <View>
                <Card style={styles.card}>
                    <Card.Title>{data.city.name}</Card.Title>
                    <Card.Divider />
                    <View style={styles.card_content}>
                        <Text>Fälle {data.city.cases7}</Text>
                        <Text>Fälle/100k {data.city.cases7_per_100k}</Text>
                        <Text>Tode {data.city.death}</Text>
                    </View>
                </Card>
                <Card style={styles.card}>
                    <Card.Title>{data.state.name}({data.state.id})</Card.Title>
                    <Card.Divider />
                    <View style={styles.card_content}>
                        <Text>Einwohner: {data.state.citizen}</Text>
                        <Text>Fälle: {data.state.cases7}</Text>
                        <Text>Fälle/100k: {data.state.cases7_per_100k}</Text>
                        <Text>Tode: {data.state.death}</Text>
                    </View>
                </Card>
                <Text>Datasource: {data.last_data_update}</Text>
                <Text>Last update: {data.last_app_update}</Text>
                <Button onPress={() => this.loadData()} title="Reload Data"/>

            </View>
        }else return<View>
            <Button onPress={() => this.loadData()} title="Load Data"/>
            </View>
    }
}


const styles = StyleSheet.create({
    card:{

    },
    card_content: {
        position: "relative",
        alignItems: "center"
    },
});

export {CityView};