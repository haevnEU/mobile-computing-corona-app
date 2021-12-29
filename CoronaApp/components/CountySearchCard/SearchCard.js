import {Button, View} from "react-native";
import {Card} from "react-native-elements";
import {styles} from "../CountyDetailCard/CountyDetailCardStyle";
import {SearchElement} from "../SearchElement/SearchElement";
import React from "react";

const SearchCard = (props) => {

return (
    <View>
        <Card containerStyle={styles.card}>
            <Card.Title style={[styles.title]}>{props.title || "Search"}</Card.Title>
            <Card.Divider/>
            <SearchElement styles={styles.search_element}
                           data={props.dataList}
                           currentlySelectedCountyName={props.searchResult}
                           setCurrentlySelectedCountyName={props.setSearchResult}/>

            <Card.Divider/>
            <View style={[styles.button_container]}>
                <Button styles={[styles.text, styles.button]}
                        onPress={props.onSearch()}
                        title={props.buttonText || "Search"}/>
            </View>
        </Card>
    </View>
)
}
export {SearchCard};