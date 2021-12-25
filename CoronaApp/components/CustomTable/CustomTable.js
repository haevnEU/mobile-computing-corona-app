import {Text, View} from "react-native";
import React, {useState} from "react";


const createRow = (key, value)=> {
    return (<View
            style={{
                padding: 10,
                flexDirection: "row"
            }}
        >
            <Text style={{flex: 0.5, color: "#ffffff", fontSize: 28}}>{key}</Text>
            <Text style={{flex: 0.5, color: "#ffffff", fontSize: 28}}>{value}</Text>
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
    return (
        <View>
            {generateRows(data)}
        </View>
    )
}