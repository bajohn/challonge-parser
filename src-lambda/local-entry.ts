import { UPDATE_COMPLETE } from "../src-shared/constants";
import { router } from "./entrypoints/api-entry";
import { updaterHandler } from "./entrypoints/invoked-dynamo-updater";
import { getMetaField, putMetaField } from "./lib/dynamo";


// setIsTesting(true);
// handler();
const rootUrl = 'https://xx3ptt5y85.execute-api.us-west-2.amazonaws.com/summit-stage/';
const main = async () => {
    //await putMetaField('updateStatus', UPDATE_COMPLETE);

    console.log('hi there');
    //const ret = await router('reload-dynamo', 'POST', {}, '')
    setInterval(async () => {
        console.log('tick')
        //const resp = await getMetaField('updateStatus');
        const resp = await fetch(rootUrl + 'get-update-status');
        const body = await resp.json()
        if (resp.status !== 200) {
            console.log('ERROR')
            console.log(resp.status, body)
        } else {
            console.log('ok')
            // console.log(resp.status, body)
        }

    }, 500)
    //console.log(ret)
}

main();
