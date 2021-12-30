import {NationDataServiceUrl} from "../utils/ApplicationData";
import logger from "../utils/Logger";
import {OneDayAsMilli} from "../utils/GeneralUtils";


let dataSource = {update: 0};

/**
 * Updates the datasource for germany.<br>
 * Note: To achieve a resource friendly usage the datasource can only be updated once a day
 * @returns {Promise<boolean>} Always true
 */
const updateDataSource = async () => {
    logger.enter("updateDataSource()", "NationalDataController");

    let currentTime = Date.now();

    // The previous update is older than a day => refresh it
    if(dataSource['update'] - currentTime < 0) {
        logger.info("Update state data");
        const response = await fetch(NationDataServiceUrl);
        const result = await response.json();

        logger.info("Update state")
        dataSource = {
            update: (currentTime + OneDayAsMilli),
            national: {
                cases7: result['casesPerWeek'],
                cases7_per_100k: result['weekIncidence'],
                death: result['deaths'],
            }
        }
    }

    logger.leave("updateDataSource()", "NationalDataController");
    return true;
}

/**
 * Access the datasource for a country data
 * @returns {Promise<JSON>} Json Document with all the data about a country.
 */
export default async function NationalDataController() {
    logger.enter("NationalDataController()", "NationalDataController");
    await updateDataSource();

    logger.leave("NationalDataController()", "NationalDataController");
    return dataSource;
}
