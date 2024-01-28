import { UPDATE_COMPLETE } from "../src-shared/constants";
import { router } from "./entrypoints/api-entry";
import { updaterHandler } from "./entrypoints/invoked-dynamo-updater";
import { dyGetAllPlayers, dyGetMetaField, dyGetPodiumFinishes, dyPutMetaField } from "./lib/dynamo";
import { updateDynamo } from "./lib/updateDynamo";


// setIsTesting(true);
// handler();
const rootUrl = 'https://xx3ptt5y85.execute-api.us-west-2.amazonaws.com/summit-stage/';
const main = async () => {
    console.log('hi there');
    
    // const resp = await getPodiumFinishes();
    //const players = await getAllPlayers();
    const resp = await updateDynamo(true);
    console.log(resp);
}

main();
