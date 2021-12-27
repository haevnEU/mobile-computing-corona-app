import {Card} from "react-native-elements";
import {styles} from "../CountyView/CountyViewStyle";
import {Button, Text} from "react-native";
import {CustomTable} from "../CustomTable/CustomTable";
import React, {useState} from "react";


export const extractCountyDataset = (data) => {
    return [
        {
            "key": "Einwohner",
            "value": data['population']
        },
        {
            "key": "Inzidenz",
            "value": data['incidence']
        },
        {
            "key": "Fälle gesamt",
            "value": data['cases']
        },
        {
            "key": "Fälle/Woche",
            "value": data['casesPerWeek']
        },
        {
            "key": "Tode",
            "value": data['death']
        },
        {
            "key": "Tode/Woche",
            "value": data['deathPerWeek']
        }
    ]
}

export const CustomCountyCard = (props) => {
    const [county, setCounty] = useState(props.county);
    return (
        <Card containerStyle={styles.card}>
            <Card.Title style={[styles.title]}>{county.name}</Card.Title>
            <Text style={[styles.subtitle]}>{county.state}</Text>
            <Card.Divider/>
            <CustomTable data={extractCountyDataset(county.data)}/>
            <Card.Divider/>
            {props.onButton && <Button onPress={props.onButton} title={props.buttonText}/>}
        </Card>
    )
}