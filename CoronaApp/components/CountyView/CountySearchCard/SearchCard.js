import {Text, TouchableOpacity, View} from "react-native";
import {Card} from "react-native-elements";
import {styles} from "../CountyDetailCard/CountyDetailCardStyle";
import {SearchElement} from "../../customElements/SearchElement/SearchElement";
import React from "react";

/**
 * This component shows a generic search card
 * @param props The properties must contain a dataList array, a searchResult state and an onSearch callback
 * @returns {JSX.Element} React native component
 */
const SearchCard = (props) => {

return (
    <View>
        <Card containerStyle={styles.card}>
            <Card.Title style={[styles.title]}>{props.title || "Landkreis suchen"}</Card.Title>
            <Card.Divider/>
            <SearchElement styles={styles.search_element}
                           data={props.dataList}
                           currentlySelectedCountyName={props.searchResult}
                           setCurrentlySelectedCountyName={props.setSearchResult}/>

            <Card.Divider/>
            <View style={[styles.button_container]}>
                <TouchableOpacity onPress={props.onSearch} style={[styles.button_container]}>

                        <Text style={styles.button_text}> {props.buttonText || 'search'} </Text>

                </TouchableOpacity>
            </View>
        </Card>
    </View>
)
}
export {SearchCard};
