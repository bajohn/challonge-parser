import { UPDATE_COMPLETE } from "./constants/constants";
import { router } from "./entrypoints/api-entry";
import { updaterHandler } from "./entrypoints/invoked-dynamo-updater";
import { putMetaField } from "./lib/dynamo";


// setIsTesting(true);
// handler();

const main = async () => {
    console.log('hi there');
    const ret = await router('get-update-status', 'GET', {}, '')
    console.log(ret)

    await putMetaField('updateStatus', UPDATE_COMPLETE)
}

main();
