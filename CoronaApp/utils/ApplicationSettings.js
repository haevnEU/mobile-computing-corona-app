import AsyncStorage from "@react-native-async-storage/async-storage";

class ApplicationSettings {
    #data = {
        "gps": true
    }

    #gpsChangeCallbacks = [];

    fromJson(json){
        this.#data = JSON.parse(json);
    }

    asJson(){
        return JSON.stringify(this.#data)
    }

    getGps(){
        return this.#data.gps;
    }

    async setGps(value){
        this.#data.gps = value;
        for(let callback of this.#gpsChangeCallbacks){
            callback();
        }
        await AsyncStorage.setItem('ApplicationSettings', AppSettings.asJson());

    }

    addOnGpsChange(callback) {
        this.#gpsChangeCallbacks.push(callback);
    }
}

const AppSettings = new ApplicationSettings();

export {AppSettings};
