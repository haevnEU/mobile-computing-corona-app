import {CityView} from "./components/CityView";
import {SettingsView} from "./components/SettingsView";
import {NationView} from "./components/NationView";
import React from 'react';
import { Header } from "react-native-elements";
import {View, StyleSheet, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D2D2D'}}>
            <Text style={{fontSize: 25, color: 'white', fontWeight: 'bold'}}> LANDKREIS HINZUFÜGEN</Text>
            <View style={styles.card_content}>

            </View>

            <NationView />
            <CityView />
        </View>

    );
}

function MapScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D2D2D'}}>

        </View>
    );
}

function SettingScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D2D2D'}}>
            <SettingsView />
        </View>
    );
}



const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Header backgroundColor={'#2d2d2d'} style={styles.headerContainer} leftComponent={{text: 'InTrack', style: styles.heading}}/>
            <Tab.Navigator screenOptions={{headerShown: false, tabBarInactiveBackgroundColor:'#2D2D2D',
                tabBarActiveBackgroundColor: '#858585', tabBarActiveTintColor: 'white'}}
                    >
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
    heading: {
        color: 'white',
        width: 500,
        fontSize: 30,
        fontWeight: 'bold',
        overflow: "visible"
    },
    headerContainer: {
        backgroundColor: '#4d4d4d'
    },

    card_content: {
        backgroundColor: "#B6FC95",
        height: '10%',
        width: '90%',
        position: "relative",
        textAlignVertical: 'center',
        alignItems: "center",
        marginBottom: '5%',
        paddingTop: 7,
        borderRadius: 50,
        top: 10

    },

});

