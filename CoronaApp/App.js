import {SettingsView} from "./components/SettingsView/SettingsView";
import {NationView} from "./components/NationView/NationView";
import React, {useEffect, useState} from 'react';
import {Header} from "react-native-elements";
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CountyView} from "./components/CountyView/CountyView";
import styles from './styles/default'
import {Locator} from "./services/LocationService";
import ApplicationData, {ITEM_WIDTH} from "./utils/ApplicationData";

import {updateCountyDataSource} from "./api/CountyDataController"
import logger from "./utils/Logger";
function HomeScreen() {
    const [showSearch, setShowSearch] = useState(true);
    const [data, setData] = useState({});
    const [errorText, setErrorText] = useState("");
    const [counties, setCounties] = useState([]);
    const [chosenCounty, setChosenCounty] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: '#2D2D2D'}}>
            {//   <AddCountyButtonView/>
            }
            <ScrollView
                horizontal={true}
                decelerationRate={"normal"}
                snapToInterval={ITEM_WIDTH}
                bounces={false}
                style={{ marginTop: 40, paddingHorizontal: 0 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={12}
            >
            <NationView />
            <CountyView showSearch={showSearch} setShowSearch={setShowSearch}
                        data={data} setData={setData}
                        errorText={errorText} setErrorText={setErrorText}
                        counties={counties} setCounties={setCounties}
                        chosenCounty={chosenCounty} setChosenCounty={setChosenCounty}
            />
        </ScrollView>
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
        logger.enter("App initial useEffect");

        logger.info("Request all required permissions")
        setLoadingTest("Request permissions");
        await Locator.request();

        logger.info("Update data sources");
        setLoadingTest("Super fast V8 turbo is updating data sources");
        await updateCountyDataSource();

        if (Locator.isGranted()) {
            logger.info("Locate user");
            setLoadingTest("Locating user inside real world using V8 turrrrrrbo");
            ApplicationData.county = await Locator.getCurrentCityName().catch(error => {
                logger.critical("Cannot locate the user using default Berlin Mitte");
                logger.exception(error);
                return "Berlin Mitte"
            });
        } else {
            logger.warn("Location service has no permission");
        }

        logger.info("Done initializing");
        setLoadingTest("V8 goes rrrrrrrr")
        setLoading(false);

        logger.leave("App initial useEffect");
    }, []);

    if (loading) {
        return (
            <SafeAreaProvider>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
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