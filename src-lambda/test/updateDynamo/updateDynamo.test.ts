import { describe, expect, test, jest } from '@jest/globals';
import { allPlayers, newPlayers, podiumFinishes } from './playerData';

import { getAllPlayers, getPodiumFinishes } from "../../lib/dynamo";
import { removeDeprecatedPlayers } from "../../lib/updateDynamo";
import { dynamoGet, dynamoRemove, dynamoScan } from "../../lib/dynamoUtil";
import { DeleteItemCommandInput, GetItemCommandInput, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { iPlayer } from '../../../src-shared/types';


jest.mock("../../lib/dynamoUtil"); // magic 

const mockedDynamoGet = jest.mocked(dynamoGet);
const mockedDynamoScan = jest.mocked(dynamoScan);
const mockedDynamoRemove = jest.mocked(dynamoRemove);
mockedDynamoGet.mockImplementation(async (input: GetItemCommandInput) => {
    const Key = input?.Key;
    if (typeof Key === 'object') {
        const key = Key['key'].S;
        if (typeof key === 'string') {

            const lookup = {
                podiumFinishes,
            } as { [key: string]: any };

            const val = lookup[key];
            return {
                value: {
                    ...val
                }
            }
        }

    }
    throw Error(`Missing key in get call ${input}`);
});

mockedDynamoScan.mockImplementation(async (input: ScanCommandInput) => {
    const TableName = input?.TableName
    if (typeof TableName === 'string') {
        if (TableName === 'SummitPlayers') {
            return allPlayers
        }
    }
    throw Error(`Unknown ${input}`);
});

mockedDynamoRemove.mockImplementation(async (input: DeleteItemCommandInput) => {
    return { $metadata: {}, };
});

test("dynamoGet is mocked properly", async () => {
    const resp = await getPodiumFinishes();
    expect(mockedDynamoGet).toHaveBeenCalled();
    expect(resp).toEqual(podiumFinishes);
});

test("dynamoScan is mocked properly", async () => {
    const resp = await getAllPlayers()
    expect(resp.players).toEqual(allPlayers);
});

test("players are removed properly when reloading Dynamo", async () => {
    await removeDeprecatedPlayers(newPlayers);
    expect(mockedDynamoRemove).toHaveBeenCalledWith({ TableName: 'SummitPlayers', Key: { playerName: { S: 'player 1' } } });
    expect(mockedDynamoRemove).toHaveBeenCalledWith({ TableName: 'SummitPlayers', Key: { playerName: { S: 'player 3' } } });
    expect(mockedDynamoRemove).toHaveBeenCalledTimes(2);
})