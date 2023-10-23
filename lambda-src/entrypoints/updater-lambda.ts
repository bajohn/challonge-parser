import { Handler } from "aws-lambda";
import { updateDynamo } from "../lib/updateDynamo";

export const updaterHandler: Handler = async (event, context) => {
    console.log('Updater triggered', event);
    await updateDynamo();
};
