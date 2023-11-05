import { UPDATE_COMPLETE } from "../src-shared/constants";
import { router } from "./entrypoints/api-entry";
import { updaterHandler } from "./entrypoints/invoked-dynamo-updater";
import { getMetaField, putMetaField } from "./lib/dynamo";


// setIsTesting(true);
// handler();
const rootUrl = 'https://xx3ptt5y85.execute-api.us-west-2.amazonaws.com/summit-stage/';
const main = async () => {
    // await putMetaField('updateStatus', UPDATE_COMPLETE);

    console.log('hi there');
    //const ret = await router('reload-dynamo', 'POST', {}, '')
    setInterval(async () => {
        console.log('tick')
        const resp = await getMetaField('updateStatus');
        
        console.log(resp)
        //await putMetaField('updateStatus', UPDATE_COMPLETE);

    }, 1000)
    //console.log(ret)
}

main();
