import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {Header} from "react-native-elements";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Locator} from "./services/LocationService";
import {
    getCountyListAsProcessableJsonObject,
    updateCountyDataSource
} from "./api/CountyDataController"
import {SettingsView} from "./components/SettingsView/SettingsView";
import styles from './styles/default'
import logger from "./utils/Logger";
import ApplicationData from "./utils/ApplicationData";
import {ImpressumView} from "./components/ImpressumView/ImpressumView";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import CountyScreen from "./Screens/CountyScreen/CountyScreen";


function SettingScreen(props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D2D2D'}}>
            <SettingsView gps={props.gps} />
            <ImpressumView />
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    //General used states
    const [gpsEnabled, setGpsEnabled] = useState(false);
    const [countyList, setCountyList] = useState({});

    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("Firing up ultra fast mega hypa hypa V8 turbo")

    // This is runs once when the application started, after finishing the loading screen will be hidden
    useEffect(async () => {
        // Note the setLoadingText will inform the user what operation is currently executed
        logger.enter("App initial useEffect");

        logger.info("Request all required permissions")
        setLoadingText("Request permissions");
        await Locator.request();

        logger.info("Update data sources");
        setLoadingText("Super fast V8 turbo is updating data sources 1/2");
        await updateCountyDataSource();

        logger.info("Updating county list");
        setLoadingText("Super fast V8 turbo is updating data sources 2/2");
        let result = await getCountyListAsProcessableJsonObject();
        setCountyList(result);

        setGpsEnabled(Locator.isGranted());
        if (Locator.isGranted()) {
            logger.info("Locate user");
            setLoadingText("Locating user inside real world using V8 turrrrrrbo");
            ApplicationData.county = await Locator.getCurrentLocationName().catch(error => {
                logger.critical("Cannot locate the user using default Berlin Mitte");
                logger.exception(error);
                return "Berlin Mitte"
            });
        } else {
            logger.warn("Location service has no permission");
        }

        logger.info("Done initializing");
        setLoadingText("...")
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
                        <Tab.Screen name="Home" children={() => <HomeScreen countyList={countyList}
                                                                            gps={[gpsEnabled, setGpsEnabled]} />}/>
                        <Tab.Screen name="Counties" children={() => <CountyScreen countyList={countyList}
                                                                                  gps={[gpsEnabled, setGpsEnabled]} />}/>
                        <Tab.Screen name="Settings" children={() => <SettingScreen gps={[gpsEnabled, setGpsEnabled]} />}/>

                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        );
    }
}

