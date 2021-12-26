import {NationDataServiceUrl} from "../utils/ApplicationData";
import logger from "../utils/Logger";

let dataSource = [];

const updateDataSource = async () => {
    logger.enter("updateDataSource()", "NationalDataController");

    logger.info("Update state data");
    const response = await fetch(NationDataServiceUrl);
    const result = await response.json();

    logger.info("Update state")
    dataSource = {
        national: {
            cases7: result['casesPerWeek'],
            cases7_per_100k: result['weekIncidence'],
            death: result['deaths'],
        }
    }

    logger.leave("updateDataSource()", "NationalDataController");
}

export default async function NationalDataController() {
    logger.enter("NationalDataController()", "NationalDataController");
    await updateDataSource();

    logger.leave("NationalDataController()", "NationalDataController");
    return dataSource;
}
