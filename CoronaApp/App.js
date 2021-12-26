import {SettingsView} from "./components/SettingsView/SettingsView";
import {NationView} from "./components/NationView/NationView";
import React, {useEffect, useState} from 'react';
import {Header} from "react-native-elements";
import {ActivityIndicator, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CountyView} from "./components/CountyView/CountyView";
import styles from './styles/default'
import {getCurrentCityName, isGranted, request} from "./services/LocationService";
import ApplicationData from "./utils/ApplicationData";

import {updateDataSource} from "./api/CountyDataController"
import Toast from 'react-native-root-toast'
function HomeScreen() {
    const [showSearch, setShowSearch] = useState(true);
    const [data, setData] = useState({});
    const [errorText, setErrorText] = useState("");
    const [counties, setCounties] = useState([]);
    const [chosenCounty, setChosenCounty] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: '#2D2D2D'}}>
            {//   <AddCountyButtonView/>
            }<NationView />
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
    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingTest] = useState("Firing up ultra fast mega hypa hypa V8 turbo")
useEffect(async () => {
    setLoadingTest("Request permissions");
    await request();
    setLoadingTest("Super fast V8 turbo is updating data sources");
    await updateDataSource();
    if(isGranted()){
        setLoadingTest("Locating user inside real world using V8 turrrrrrbo");
        ApplicationData.county = await getCurrentCityName().catch(error => {
            Toast.show('V8 Turbo cannot locate you.', {
                duration: Toast.durations.LONG,
            });
            return "Berlin Mitte"
        });
    }
    setLoadingTest("V8 goes rrrrrrrr")
    setLoading(false);
}, []);

    if (loading) {
        return (
            <SafeAreaProvider>
                <View style={{   justifyContent: 'center', alignItems: 'center', flex:1}}>
                    <Text>{loadingText}</Text>
                    <ActivityIndicator size={"large"}/>
                </View>
            </SafeAreaProvider>)
    } else {
        return (
            <SafeAreaProvider>
                <NavigationContainer>
                    <Header backgroundColor={'#2d2d2d'} style={styles.headerContainer}
                            leftComponent={{text: 'InTrack', style: styles.heading}}/>
                    <Tab.Navigator screenOptions={{
                        headerShown: false, tabBarInactiveBackgroundColor: '#2D2D2D',
                        tabBarActiveBackgroundColor: '#858585', tabBarActiveTintColor: 'white'
                    }}
                    >
                        <Tab.Screen name="Home" component={HomeScreen}/>
                        <Tab.Screen name="Map" component={MapScreen}/>
                        <Tab.Screen name="Settings" component={SettingScreen}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        );
    }
}

