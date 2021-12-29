import {ActivityIndicator, Button, Text, View} from "react-native";
import {Card} from "react-native-elements";
import {styles} from "../CountyView/CountyViewStyle";
import {SearchElement} from "../SearchElement/SearchElement";
import {ApplicationSettings} from "../../utils/ApplicationData";
import {Locator} from "../../services/LocationService";
import {getCountyInformationByName} from "../../api/CountyDataController";
import React, {useState} from "react";

const CountySearchCard = (props) => {

return (
    <View>
        <Card containerStyle={styles.card}>
            <Card.Title style={[styles.title]}>County Search</Card.Title>
            <Card.Divider/>
            <SearchElement styles={styles.search_element}
                           data={props.countyList}
                           currentlySelectedCountyName={props.searchResult}
                           setCurrentlySelectedCountyName={props.setSearchResult}/>

            <Card.Divider/>
            <View style={[styles.button_container]}>
                <Button styles={[styles.text, styles.button]}
                        onPress={() => {
                            props.onSearch();
                        }}
                        title={props.buttonText || "Search"}/>
            </View>
        </Card>
    </View>
)
}
export {CountySearchCard};