import React, {useState} from "react";
import {ScrollView, View} from "react-native";
import {ITEM_WIDTH} from "../../utils/ApplicationData";
import {NationView} from "../../components/NationView/NationView";
import {CountyDetailCard} from "../../components/CountyDetailCard/CountyDetailCard";


export default function HomeScreen(props) {
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
                <CountyDetailCard showSearch={showSearch} setShowSearch={setShowSearch}
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