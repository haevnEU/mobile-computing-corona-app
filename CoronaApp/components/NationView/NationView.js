import React, {useState} from "react";
import {View, Text} from "react-native";
import { Card } from "react-native-elements";
import NationalDataController from "../../api/NationalDataController";
import {styles} from "./NationViewStyle";

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
            <Card style={[styles.card, styles.text, styles.headline]}  containerStyle={styles.card}>
                <Card.Title style={styles.text}>Aktuell Nationale <Text style={{color: '#2d2d2d'}}>Inzidenz </Text></Card.Title>
                    <Card.Divider/>
                    <View style={styles.card_content}>
                        <Text style={styles.text}>Fälle {data.national.cases7}</Text>
                        <Text style={styles.text}>Fälle/100k {(Math.round(data.national.cases7_per_100k * 100) / 100).toFixed(2)}</Text>
                        <Text style={styles.text}>Tode {data.national.death}</Text>
                    </View>
                </Card>
            </View>

        )
    }
}

