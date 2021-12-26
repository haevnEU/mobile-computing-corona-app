import React, {useState} from "react";
import {FlatList, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import {Divider} from "react-native-elements";
import {styles} from "./SearchElementStyle";
import logger from "../../utils/Logger";

const SearchElement = (props) => {
    // The data array, general structure [{"key": "value"}]
    const data = props.data;

    // Following two must be declared as [county, setCounty] = useState();
    // County variable (getter)
    const county = props.county;
    // County variable (setter)
    const setCounty = props.setCounty;
    const [suggestionArray, setSuggestionArray] = useState({});

    // Filters the given data array in respect to the entered county name
    function filterList(countyFilterInput) {
        logger.enter("filterList(" + countyFilterInput + ")", "SearchElement");
        // When no county is provided return an empty array
        if (countyFilterInput.length === 0) {
            logger.warn("Given county filter is empty")
            setSuggestionArray({})
        } else {
            logger.info("Apply filter to data");
            // Input was provided => filter by name and assign the suggestion array the first 10 elements
            let tmp = data.filter(data_tmp => data_tmp.key.toLowerCase().startsWith(countyFilterInput.toLowerCase()));
            logger.info("Reduce the result to 10 elements");
            setSuggestionArray(tmp.slice(0, 10));
        }

        logger.leave("filterList(" + countyFilterInput + ")", "SearchElement");
        // Return the county name
        return countyFilterInput;

    }

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, styles.text]}
                placeholder="Enter query"
                value={county}
                onChangeText={countyInput => setCounty(filterList(countyInput))}/>
            <FlatList
                style={styles.suggestions}
                data={suggestionArray}
                renderItem={
                    ({item}) => (
                        <TouchableWithoutFeedback
                            onPress={
                                () => {
                                    setCounty(item.key);
                                    setSuggestionArray({});
                                }
                            }>
                            <View>
                                <Text style={[styles.suggestion_entry, styles.text]}>{item.key}</Text>
                                <Divider/>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }>
            </FlatList>
        </View>
    );
}
export {SearchElement};