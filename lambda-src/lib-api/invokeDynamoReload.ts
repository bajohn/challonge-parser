import { getMetaField } from "../lib/dynamo";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

export const invokeDynamoReload = async () => {
    await getMetaField('test');

    const client = new LambdaClient({});
    const command = new InvokeCommand({
        FunctionName: 'summit-invoked-dynamo-updater',
        Payload: JSON.stringify({}),
    });

    const { Payload, LogResult } = await client.send(command);
    const result = Buffer.from(Payload).toString();
    // const logs = Buffer.from(LogResult, "base64").toString();
    console.log('Dynamo updater Lambda invoke sent', result);

    return {
        status: 'reload underway!'
        
    }
};