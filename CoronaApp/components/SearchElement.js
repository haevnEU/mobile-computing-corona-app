import React, {useState} from "react";
import {FlatList, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import {Divider} from "react-native-elements";

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
        // When no county is provided return an empty array
        if (countyFilterInput.length === 0) {
            setSuggestionArray({})
        } else {
            // Input was provided => filter by name and assign the suggestion array the first 10 elements
            let tmp = data.filter(data_tmp => data_tmp.key.toLowerCase().startsWith(countyFilterInput.toLowerCase()));
            setSuggestionArray(tmp.slice(0, 10));
        }

        // Return the county name
        return countyFilterInput;

    }

    return (
        <View>

            <TextInput
                placeholder="Enter query"
                value={county}
                onChangeText={countyInput => setCounty(filterList(countyInput))}/>
            <FlatList
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
                                <Text style={{textAlign: 'center'}}>{item.key}</Text>
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