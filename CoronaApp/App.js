
import {CityView} from "./components/CityView";
import React from 'react';
import {View, StyleSheet, SafeAreaView } from 'react-native';

const App = () => (

    <SafeAreaView style={styles.container}>
        <View>
            <CityView/>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default App;
