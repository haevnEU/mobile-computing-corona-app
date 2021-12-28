import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {Header} from "react-native-elements";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Locator} from "./services/LocationService";
import {CountyView} from "./components/CountyView/CountyView";
import {NationView} from "./components/NationView/NationView";
import {updateCountyDataSource} from "./api/CountyDataController"
import {SettingsView} from "./components/SettingsView/SettingsView";
import styles from './styles/default'
import logger from "./utils/Logger";
import ApplicationData, {ITEM_WIDTH} from "./utils/ApplicationData";
import {AddCountyButtonView} from "./components/AddCountyButtonView/AddCountyButtonView";
import {ImpressumView} from "./components/ImpressumView/ImpressumView";


function HomeScreen() {
    const [showSearch, setShowSearch] = useState(true);
    const [data, setData] = useState({});
    const [errorText, setErrorText] = useState("");
    const [counties, setCounties] = useState([]);
    const [chosenCounty, setChosenCounty] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: '#2D2D2D'}}>
            <ScrollView

                decelerationRate={"normal"}
                snapToInterval={ITEM_WIDTH}
                bounces={false}
                style={{ marginTop: 40, paddingHorizontal: 0 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={12}>
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

function CountyScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D2D2D'}}>
            <ScrollView
                horizontal={true}
                decelerationRate={"normal"}
                snapToInterval={ITEM_WIDTH}
                bounces={false}
                style={{ marginTop: 40, paddingHorizontal: 0 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={12}>
                <AddCountyButtonView />
            </ScrollView>
        </View>
    );
}

function SettingScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D2D2D'}}>
            <SettingsView />
            <ImpressumView />
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
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
        setLoadingText("Super fast V8 turbo is updating data sources");
        await updateCountyDataSource();

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
                        <Tab.Screen name="Home" component={HomeScreen}/>
                        <Tab.Screen name="Counties" component={CountyScreen}/>
                        <Tab.Screen name="Settings" component={SettingScreen}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        );
    }
}

