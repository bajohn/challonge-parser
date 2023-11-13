import { UPDATE_COMPLETE } from "../src-shared/constants";
import { router } from "./entrypoints/api-entry";
import { updaterHandler } from "./entrypoints/invoked-dynamo-updater";
import { getAllPlayers, getMetaField, getPodiumFinishes, putMetaField } from "./lib/dynamo";
import { updateDynamo } from "./lib/updateDynamo";


// setIsTesting(true);
// handler();
const rootUrl = 'https://xx3ptt5y85.execute-api.us-west-2.amazonaws.com/summit-stage/';
const main = async () => {
    console.log('hi there');
    
    // const resp = await getPodiumFinishes();
    const players = await getAllPlayers();
    // const resp = await updateDynamo(true);
    console.log(players);
}

main();
