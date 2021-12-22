import {SettingsView} from "./components/SettingsView";
import React, {useState} from 'react';
import { Header } from "react-native-elements";
import {View, StyleSheet, Text, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {CountyView} from "./components/CountyView";
import {SearchElement} from "./components/SearchElement";
import {getAllCounties} from "./api/CountyDataController";

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CountyView />
        </View>
    );
}

async function mapData(){
    let array = await getAllCounties();
    array = array.filter((value, index) => array.indexOf(value)===index);
    let updated = [];
    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        updated.push({ "key": value });
    }
    return updated;
}

function MapScreen() {
    const [data, setData] = useState([]);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello</Text>
            <SearchElement data={data} />
            <Button title="Press me" onPress={() => mapData().then(result => setData(result))}/>
        </View>
    );
}

function SettingScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SettingsView/>
        </View>
    );
}



const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <Header placement="left" centerComponent={{ text: 'InTrack', style: { color: '#fff', fontSize: 32 } }}/>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Map" component={MapScreen} />
                    <Tab.Screen name="Settings" component={SettingScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
     );
}

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

