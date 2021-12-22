import {NationDataServiceUrl} from "../utils/ApplicationData";

let dataSource = [];

const updateDataSource = async () => {
    const response = await fetch(NationDataServiceUrl);
    const result = await response.json();
    dataSource = {
        national: {
            cases7: result['casesPerWeek'],
            cases7_per_100k: result['casesPer100k'],
            death: result['deaths'],
        }
    }
}

export default async function NationalDataController() {
    await updateDataSource();
    return dataSource;
}
