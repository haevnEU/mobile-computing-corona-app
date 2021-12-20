const fetchData = async () => {
    let url = 'https://api.corona-zahlen.org/germany'
    console.log('Fetching data:....')
    console.log(fetch(url))
    return await fetch(url);
};



export default async function NationalDataController() {
    let data = await fetchData()
    console.log('Parsing data:....')
    console.log(data)
    console.log('Parsed data!...')
    let result = data;
    if (null !== data) {
        result = data['object'].find(obj => {
                return obj;
            }
        );

        return {
            national: {
                cases7: result['casesPerWeek'],
                cases7_per_100k: result['casesPer100k'],
                death: result['deaths'],
            },
        };
    }
}
