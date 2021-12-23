import {SettingsView} from "./components/SettingsView/SettingsView";
import {NationView} from "./components/NationView/NationView";
import React, {useState} from 'react';
import { Header } from "react-native-elements";
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {CountyView} from "./components/CountyView/CountyView";
import styles from './styles/default'
import {getCityName, locate} from "./services/LocationService";
import ApplicationData from "./utils/ApplicationData";

function HomeScreen() {
    const [showSearch, setShowSearch] = useState(true);
    const [data, setData] = useState({});
    const [errorText, setErrorText] = useState("");
    const [counties, setCounties] = useState([]);
    const [chosenCounty, setChosenCounty] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: '#2D2D2D'}}>
            <NationView />
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

    locate().then(gpsLocation => {
        getCityName(gpsLocation.long, gpsLocation.lat).then(countyName => {
            ApplicationData.county = countyName;
            setLoading(false);
        });
    })
    if (loading) {
        return (
            <SafeAreaProvider>
                <View style={{   justifyContent: 'center', alignItems: 'center', flex:1}}>
                    <Text>Loading fast V8 Turbo...</Text>
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

