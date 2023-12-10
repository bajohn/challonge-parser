import { describe, expect, test, jest } from '@jest/globals';
import { allPlayers, newPlayers, podiumFinishes } from './playerData';

import { getAllPlayers, getPodiumFinishes } from "../../lib/dynamo";
import { executeUpdate, removeDeprecatedPlayers } from "../../lib/updateDynamo";
import { dynamoGet, dynamoPut, dynamoRemove, dynamoScan } from "../../lib/dynamoUtil";
import { DeleteItemCommandInput, GetItemCommandInput, PutItemCommandInput, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { iPlayer, iStatStore } from '../../../src-shared/types';
import { oneTourneyH2H, testPodiumFinishes, testTourneys, testh2h } from '../addTourneys/tourneydata';
import { marshall } from '@aws-sdk/util-dynamodb';


jest.mock("../../lib/dynamoUtil"); // magic 

const mockedDynamoGet = jest.mocked(dynamoGet);
const mockedDynamoScan = jest.mocked(dynamoScan);
const mockedDynamoRemove = jest.mocked(dynamoRemove);
const mockedDynamoPut = jest.mocked(dynamoPut);
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

mockedDynamoPut.mockImplementation(async (input: PutItemCommandInput) => {
    return { '$metadata': {} };
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

test("executeUpdate pushes statsStore data into dynamo correctly.", async () => {
    const statStore: iStatStore = {
        h2h: testh2h,
        podiumFinishes: testPodiumFinishes,
        tourneys: testTourneys
    };

    await executeUpdate(statStore);

    // Metadata pushed
    const expectedMetadata = {
        podiumFinishes: testPodiumFinishes,
        h2h: testh2h
    };

    const expectedPodium = {
        key: 'podiumFinishes',
        value: {
            ...testPodiumFinishes
        }
    };

    expect(mockedDynamoPut).toHaveBeenCalledWith({
        TableName: "SummitMetadata",
        Item: {
            ...marshall(expectedPodium)
        }
    });

    const expectedH2H = {
        key: 'h2h',
        value: {
            ...testh2h
        }
    };

    expect(mockedDynamoPut).toHaveBeenCalledWith({
        TableName: "SummitMetadata",
        Item: {
            ...marshall(expectedH2H)
        }
    });


    // // Four players pushed
    expect(mockedDynamoPut).toHaveBeenCalledWith({
        TableName: 'SummitPlayers',
        Item: {
            ...marshall({
                playerName: 'Player 1',
                w: 1,
                l: 2
            })
        }
    });
    expect(mockedDynamoPut).toHaveBeenCalledWith({
        TableName: 'SummitPlayers',
        Item: {
            ...marshall({
                playerName: 'Player 2',
                w: 0,
                l: 2
            })
        }
    });
    expect(mockedDynamoPut).toHaveBeenCalledWith({
        TableName: 'SummitPlayers',
        Item: {
            ...marshall({
                playerName: 'Player 3',
                w: 2,
                l: 1
            })
        }
    });
    expect(mockedDynamoPut).toHaveBeenCalledWith({
        TableName: 'SummitPlayers',
        Item: {
            ...marshall({
                playerName: 'Player 4',
                w: 3,
                l: 1
            })
        }
    });

    expect(mockedDynamoPut).toHaveBeenCalledWith({
        TableName: 'SummitTourneys',
        Item: {
            ...marshall(testTourneys[0].tournament)
        }
    });

    expect(mockedDynamoPut).toHaveBeenCalledWith({
        TableName: 'SummitTourneys',
        Item: {
            ...marshall(testTourneys[1].tournament)
        }
    });
})