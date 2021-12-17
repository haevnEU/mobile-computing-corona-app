import {CityView} from "./components/CityView";
import {SettingsView} from "./components/SettingsView";
import {NationView} from "./components/NationView";
import React from 'react';
import { Header } from "react-native-elements";
import {View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <NationView />
            <CityView />
        </View>

    );
}

function MapScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        </View>
    );
}

function SettingScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SettingsView />
        </View>
    );
}



const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Header style={{flex: 1, flexWrap: 'wrap'}}>InTrack</Header>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Map" component={MapScreen} />
                <Tab.Screen name="Settings" component={SettingScreen} />
            </Tab.Navigator>
        </NavigationContainer>
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

