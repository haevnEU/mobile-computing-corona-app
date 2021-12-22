import {SettingsView} from "./components/SettingsView";
import {NationView} from "./components/NationView";
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
    const [showSearch, setShowSearch] = useState(true);
    const [data, setData] = useState({});
    const [errorText, setErrorText] = useState("");
    const [counties, setCounties] = useState([]);
    const [chosenCounty, setChosenCounty] = useState("");
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <CountyView showSearch={showSearch} setShowSearch={setShowSearch}
                        data={data} setData={setData}
                        errorText={errorText} setErrorText={setErrorText}
                        counties={counties} setCounties={setCounties}
                        chosenCounty={chosenCounty} setChosenCounty={setChosenCounty}
            />
        </View>

    );
}

function MapScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D2D2D'}}>
            <NationView />

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

