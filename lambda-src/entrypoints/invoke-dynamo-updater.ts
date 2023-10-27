import { Handler } from "aws-lambda";
import { updateDynamo } from "../lib/updateDynamo";

export const updaterHandler: Handler = async (event, context) => {
    console.log('Invoked updater triggered', event);
    // await updateDynamo(true);
    return { status: 'done' }
};
