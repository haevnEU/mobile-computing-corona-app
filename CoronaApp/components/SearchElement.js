import React, {useState} from "react";
import {StyleSheet, View, Text, TextInput, FlatList, TouchableWithoutFeedback} from "react-native";

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
        <View style={styles.searchElementContainer}>
            <TextInput style={styles.searchElementInput}
                       placeholder="Enter query"
                       value={county}
                       onChangeText={countyInput => setCounty(filterList(countyInput))}/>

            <FlatList style={styles.searchElementSuggestionList}
                      data={suggestionArray}
                      renderItem={
                          ({item}) => (
                              <TouchableWithoutFeedback style={styles.searchElementSuggestionListElementContainer}
                                                        onPress={
                                                            () => {
                                                                setCounty(item.key);
                                                                setSuggestionArray({});
                                                            }
                                                        }>
                                  <View style={styles.searchElementSuggestionListElement}>
                                      <Text>{item.key}</Text>
                                  </View>
                              </TouchableWithoutFeedback>
                          )
                      }>
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({

    searchElementContainer:{

    },

    searchElementInput:{

    },

    searchElementSuggestionList:{

    },

    searchElementSuggestionListElementContainer:{

    },
    searchElementSuggestionListElement:{

    },
});

export {SearchElement};