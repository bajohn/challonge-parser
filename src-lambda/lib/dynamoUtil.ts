import {
    DynamoDBClient,
    ListTablesCommand,
    PutItemCommand,
    GetItemCommand,
    ScanCommand,
    GetItemCommandInput,
    PutItemCommandInput,
    ScanCommandInput,
    DeleteItemCommand,
    DeleteItemCommandInput
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { iPlayer } from "../../src-shared/types";

const region = 'us-west-2'

export const dynamoGet = async (input: GetItemCommandInput) => {
    const command = new GetItemCommand(input);
    const client = new DynamoDBClient({ region });
    const response = await client.send(command);
    // null check - what do we want here?
    if ('Item' in response) {
        const unmarshalled = unmarshall(response.Item);
        return unmarshalled
    }
    console.log('Item not found', JSON.stringify(input))
    return {};
};

export const dynamoPut = async (input: PutItemCommandInput) => {
    const client = new DynamoDBClient({ region });
    const command = new PutItemCommand(input);
    const response = await client.send(command);
    return response
};

export const dynamoRemove = async (input: DeleteItemCommandInput) => {
    const client = new DynamoDBClient({ region });
    const command = new DeleteItemCommand(input);
    const response = await client.send(command);
    return response
};



export const dynamoScan = async (input: ScanCommandInput) => {
    const client = new DynamoDBClient({ region });
    const command = new ScanCommand(input);
    const response = await client.send(command);
    if ('Items' in response) {
        const items = response.Items;
        return items.map((el: any) => unmarshall(el)) as any[]

    }
    console.log('Items not found', JSON.stringify(input));
    return [];
};




