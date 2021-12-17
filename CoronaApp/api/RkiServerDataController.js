const fetchData = async (long, lat) => {
    let longStart = long - 0.000005;
    let longEnd = long   + 0.000005;
    let latStart = lat   - 0.000005;
    let latEnd = lat     + 0.000005;
    let urlFormat = longStart + "," + latStart + "," + longEnd + "," + latEnd;
    let url = "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?" +
        "where=1%3D1" +
        "&outFields=death_rate,cases,deaths,cases_per_100k,cases_per_population,BL,BL_ID,county,last_update,cases7_per_100k,recovered,EWZ_BL,cases7_bl_per_100k,cases7_bl,death7_bl,cases7_lk,death7_lk,cases7_per_100k_txt,AdmUnitId" +
        "&geometry=" + urlFormat +
        "&geometryType=esriGeometryEnvelope" +
        "&inSR=4326" +
        "&spatialRel=esriSpatialRelIntersects" +
        "&outSR=4326" +
        "&f=json"
    const response = await fetch(url);
    return response.json();
};

export default async function RkiServerDataController(long, lat) {
    let data = await fetchData(long, lat)

    let result = data;
    if(null !== data) {
        result = data['features'].find(obj => {
            return obj;
        }
        );
        let date = new Date();
        let dateString = date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + " Uhr"
        return {
            rawdata: result['attributes'],
            state:{
                id: result['attributes']['BL_ID'],
                name: result['attributes']['BL'],
                citizen: result['attributes']['EWZ_BL'],
                cases7: result['attributes']['cases7_bl'],
                cases7_per_100k: result['attributes']['cases7_bl_per_100k'],
                death: result['attributes']['death7_bl'],
            },
            city: {
                name: result['attributes']['county'],
                citizen: 0,
                cases7: result['attributes']['cases7_lk'],
                cases7_per_100k: result['attributes']['cases7_per_100k'],
                death: result['attributes']['death7_lk'],
            },
            last_data_update: result['attributes']['last_update'],
            last_app_update: dateString
        };
    }
}
