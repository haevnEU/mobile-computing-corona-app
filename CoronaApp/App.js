import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, ScrollView, Text, View} from 'react-native';
import {Header} from "react-native-elements";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Locator} from "./services/LocationService";
import {CountyView} from "./components/CountyView/CountyView";
import {NationView} from "./components/NationView/NationView";
import {
    getCountyInformationByName,
    getCountyListAsProcessableJsonObject,
    updateCountyDataSource
} from "./api/CountyDataController"
import {SettingsView} from "./components/SettingsView/SettingsView";
import styles from './styles/default'
import logger from "./utils/Logger";
import ApplicationData, {ApplicationSettings, ITEM_WIDTH} from "./utils/ApplicationData";
import {AddCountyButtonView} from "./components/AddCountyButtonView/AddCountyButtonView";
import {ImpressumView} from "./components/ImpressumView/ImpressumView";
import {CustomCountyCard} from "./components/CustomCountyCard/CustomCountyCard";
import {SearchElement} from "./components/SearchElement/SearchElement";
import {CountySearchCard} from "./components/CountySearchCard/CountySearchCard";


function HomeScreen(props) {
    const [showSearch, setShowSearch] = useState(true);
    const [data, setData] = useState({});
    const [errorText, setErrorText] = useState("");
    const [counties, setCounties] = useState([]);
    const [chosenCounty, setChosenCounty] = useState("");
    return (
        <View style={{ flex: 1, backgroundColor: '#2D2D2D'}}>
            <ScrollView
                horizontal={true}
                decelerationRate={"normal"}
                snapToInterval={ITEM_WIDTH}
                bounces={false}
                style={{ marginTop: 40, paddingHorizontal: 0 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={12}>
                <NationView />
                <CountyView showSearch={showSearch} setShowSearch={setShowSearch}
                            gps={props.gps}
                            data={data} setData={setData}
                            errorText={errorText} setErrorText={setErrorText}
                            counties={counties} setCounties={setCounties}
                            chosenCounty={chosenCounty} setChosenCounty={setChosenCounty}
                            countyList={props.countyList}
                />
        </ScrollView>
        </View>
    );
}

function CountyScreen(props) {
    const [favouriteCounties, setFavouriteCounties] = useState([]);

    const [rerender, setRerender] = useState(false);
    const [searchResult, setSearchResult] = useState("");

    /**
     * This method starts a rendering process by using a toggle state
     */
    function softRerender(){
        setRerender(!rerender);
    }

    /**
     * Loads a favourite list into the application, should run once when the component is loaded
     */
    useEffect(async () => {
        logger.enter("initialize of CountyScreen", "App")

        logger.info("Read favourites from application data")
        for(let county of ApplicationData.favourites){
            let details = await getCountyInformationByName(county);
            favouriteCounties.push({"key": county, "details": details});
        }
        softRerender();

        logger.leave("initialize of CountyScreen", "App")
    }, []);

    /**
     * Adds a county to the favourite list
     * @returns {Promise<boolean>} Always true
     */
    async function addCounty(){
        logger.enter("addCounty", "App")

        let county = searchResult;
        let result = await getCountyInformationByName(county);
        favouriteCounties.push({"key": county, "details": result});
        ApplicationData.favourites.push(county)
        softRerender();

        logger.leave("addCounty", "App")

        return true;
    }

    /**
     * Removes a county from the favourite list
     * @param county County to remove
     */
    function removeCounty(county){
        logger.enter("removeCounty", "App")

        // Get the index of the favourite county
        const favouriteItemIndex = favouriteCounties.indexOf(county);

        // If the county exists as a favourite the index is greater or equal 0
        if(favouriteItemIndex >= 0){
            // remove one element at given index
            favouriteCounties.splice(favouriteItemIndex, 1);

            // Same as above get the index of the county from the favourite stored list
            const applicationDataFavouriteItemIndex = ApplicationData.favourites.indexOf(county.key);
            // Remove one favourite exists
            if(applicationDataFavouriteItemIndex >= 0){
                ApplicationData.favourites.splice(favouriteItemIndex, 1);
            }

            softRerender();

            logger.enter("removeCounty", "App");
        }
    }

    function renderElements(){
        return favouriteCounties.map((item) => {
            return (
                <View key={item.key}>
                    <CustomCountyCard county={item.details}
                                      buttonText={"Remove"}
                                      onButton={()=> removeCounty(item)} />
                </View>
            )
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#2D2D2D'}}>
        <ScrollView
                horizontal={true}
                decelerationRate={"normal"}
                snapToInterval={ITEM_WIDTH}
                bounces={false}
                style={{ marginTop: 40, paddingHorizontal: 0 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={12}>
                <View>
                    <CountySearchCard searchResult={searchResult}
                                      setSearchResult={setSearchResult}
                                      gps={props.gps}
                                      countyList={props.countyList}
                                      buttonText={"Add County"}
                                      onSearch={() => addCounty()} />
                </View>
                {
                    renderElements()
                }

            </ScrollView>
        </View>
    );
}

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
    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("Firing up ultra fast mega hypa hypa V8 turbo")
    const [countyList, setCountyList] = useState({});
    const [gpsEnabled, setGpsEnabled] = useState(false);

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

