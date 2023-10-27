import { Handler } from "aws-lambda";
import { updateDynamo } from "../lib/updateDynamo";

export const updaterHandler: Handler = async (event, context) => {
    console.log('Timed updater triggered', event);
    await updateDynamo();
};
