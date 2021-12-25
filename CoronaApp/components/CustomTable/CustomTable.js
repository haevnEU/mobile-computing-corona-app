import {Text, View} from "react-native";
import React, {useState} from "react";
import {styles} from "./CustomTableStyle";
import {Divider} from "react-native-paper";


const createRow = (key, value)=> {
    return (<View style={styles.row}>
            <Text style={styles.cell}>{key}</Text>
            <Text style={styles.cell}>{value}</Text>
            <Divider />
        </View>
    )
}

const generateRows = (data)=> {
    const result = [];
    data.map(row => {
        result.push(createRow(row.key, row.value));
    })
    return result;
}

export const CustomTable = (props) => {
    const [data] = useState(props.data);
    console.log("Table")
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{props.header}</Text>
            <Divider />
            {generateRows(data)}
        </View>
    )
}