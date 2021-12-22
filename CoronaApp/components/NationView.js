import React, {useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import { Card } from "react-native-elements";
import NationalDataController from "../api/NationalDataController";


export const NationView = () => {
    const [data, setData] = useState({});
    const [initialized, setInitialized] = useState(false);

    if(!initialized){
        NationalDataController().then(result => {
            setData(result);
            setInitialized(true);
        })
        return <View>
            <Text>Loading.... </Text>
        </View>
    }else {
        return (<View>
                <Card style={styles.card}>
                    <Card.Title>NATIONAL</Card.Title>
                    <Card.Divider/>
                    <View style={styles.card_content}>
                        <Text>Fälle {data.national.cases7}</Text>
                        <Text>Fälle/100k {(Math.round(data.national.cases7_per_100k * 100) / 100).toFixed(2)}</Text>
                        <Text>Tode {data.national.death}</Text>
                    </View>
                </Card>
            </View>

        )
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

