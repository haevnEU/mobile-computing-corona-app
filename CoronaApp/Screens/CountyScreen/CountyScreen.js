import React, {useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import ApplicationData from "../../utils/ApplicationData";
import logger from "../../utils/Logger";
import {getCountyInformationByName} from "../../api/CountyDataController";
import {CustomCountyCard} from "../../components/CustomCountyCard/CustomCountyCard";
import {SearchCard} from "../../components/CountySearchCard/SearchCard";
import {CARD_ITEM_WIDTH, isMobile} from "../../utils/GeneralUtils";


export default function CountyScreen(props) {
    const [favouriteCounties] = useState([]);

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
    async function addCounty() {
        logger.enter("addCounty", "App")
        try {
            let county = searchResult;
            let result = await getCountyInformationByName(county)
            favouriteCounties.push({"key": county, "details": result});
            ApplicationData.favourites.push(county)
            softRerender();

            logger.leave("addCounty", "App")

            return true;
        } catch (ex) {
            logger.exception(ex);
            logger.unexpectedLeft("addCounty", "App");
            return false;
        }
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
                horizontal={isMobile()}
                decelerationRate={"normal"}
                snapToInterval={CARD_ITEM_WIDTH}
                bounces={false}
                style={{ marginTop: 40, paddingHorizontal: 0 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={12}>
                <View>
                    <SearchCard searchResult={searchResult}
                                setSearchResult={setSearchResult}
                                gps={props.gps}
                                dataList={props.countyList}
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
