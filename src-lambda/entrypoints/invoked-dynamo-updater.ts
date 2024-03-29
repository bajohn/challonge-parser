import { Handler } from "aws-lambda";
import { updateDynamo } from "../lib/updateDynamo";
import { dyPutMetaField } from "../lib/dynamo";
import { FULL_RELOAD_STATUS_PATH, UPDATE_COMPLETE } from "../../src-shared/constants";

export const updaterHandler: Handler = async (event, context) => {
    console.log('Invoked updater triggered', event);
    await updateDynamo(true);
    const resp = await new Promise(res => {
        setTimeout(() => {
            res('kicked_off');
        }, 10000)
    });

    const lastUpdated = (new Date()).toISOString();
    await dyPutMetaField('lastUpdated', lastUpdated);

    await dyPutMetaField(FULL_RELOAD_STATUS_PATH, UPDATE_COMPLETE)
    return { status: 'done' }
};
