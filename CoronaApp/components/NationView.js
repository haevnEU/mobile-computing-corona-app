import React from "react";
import {Button, StyleSheet, View, Text} from "react-native";
import { Card } from "react-native-elements";
import NationalDataController from "../api/NationalDataController";

class NationView extends React.Component{

    data = null;
    state = 0;
    async loadData(){

        this.data = await NationalDataController();
        if(this.data !== null) {
            this.state = 2;
        }
        this.forceUpdate();
    }

    render(){
        let data = this.data;
        console.log(this.state)
        if(this.data !== null) {
            return <View>
                <Card style={styles.card}>
                    <Card.Title>NATIONAL</Card.Title>
                    <Card.Divider />
                    <View style={styles.card_content}>
                        <Text>Fälle {data.national.cases7}</Text>
                        <Text>Fälle/100k {(Math.round(data.national.cases7_per_100k * 100) / 100).toFixed(2)}</Text>
                        <Text>Tode {data.national.death}</Text>
                    </View>
                </Card>


            </View>
        }else return<View>
            <Button onPress={() => this.loadData()} title="Load Data"/>
        </View>
    }
}


const styles = StyleSheet.create({
    card:{
    backgroundColor: "#2D2D2D"
    },
    card_content: {
        position: "relative",
        alignItems: "center",
    },
    card_text:{
        color: 'white'
    }
});

export {NationView};
