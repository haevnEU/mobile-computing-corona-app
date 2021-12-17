const fetchData = async () => {
    let url = 'https://api.corona-zahlen.org/germany'
    console.log(fetch(url))
    return await fetch(url);

};



export default async function NationalDataController() {
    let data = await fetchData()
    console.log(data)
    let result = data;
    if (null !== data) {
        result = data['object'].find(obj => {
                return obj;
            }
        );
        return {
            national: {
                cases7: data['casesPerWeek'],
                cases7_per_100k: data['casesPer100k'],
                death: data['deaths'],
            },
        };

    }
}
