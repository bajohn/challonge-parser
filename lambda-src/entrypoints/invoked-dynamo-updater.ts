import { Handler } from "aws-lambda";
import { updateDynamo } from "../lib/updateDynamo";
import { putMetaField } from "../lib/dynamo";
import { UPDATE_COMPLETE } from "../constants/constants";

export const updaterHandler: Handler = async (event, context) => {
    console.log('Invoked updater triggered', event);
    // await updateDynamo(true);
    const lastUpdated = (new Date()).toISOString();
    await putMetaField('lastUpdated', lastUpdated);
    await putMetaField('updateStatus', UPDATE_COMPLETE)
    return { status: 'done' }
};
