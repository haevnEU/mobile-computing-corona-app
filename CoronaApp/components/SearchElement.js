import React, {useState} from "react";
import {StyleSheet, View, Text, TextInput, FlatList} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

const SearchElement = (props) => {
    const data = props.data;
    const [result, setResult] = useState({});
    function filterList(text) {
        if (text.length === 0) {
            setResult({})
        } else {
            let tmp = data.filter(data_tmp => data_tmp.key.toLowerCase().startsWith(text.toLowerCase()));
            setResult(tmp.slice(0, 10));
        }
    }

    return (
        <View style={styles.container}>
            <TextInput placeholder="Enter query"   onChangeText={text => filterList(text)}/>
            <FlatList
                data={result}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
        </View>
    );
}

export {SearchElement};