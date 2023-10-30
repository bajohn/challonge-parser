import { UPDATE_COMPLETE } from "./constants/constants";
import { router } from "./entrypoints/api-entry";
import { updaterHandler } from "./entrypoints/invoked-dynamo-updater";
import { putMetaField } from "./lib/dynamo";


// setIsTesting(true);
// handler();

const main = async () => {
    //await putMetaField('updateStatus', UPDATE_COMPLETE);
    console.log('hi there');
    //const ret = await router('reload-dynamo', 'POST', {}, '')
    //console.log(ret)
}

main();
