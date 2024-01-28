import { iPlayer, iStatStore, iTournament, iTournamentData } from "../../src-shared/types";


import { marshall } from "@aws-sdk/util-dynamodb";
import { dynamoGet, dynamoPut, dynamoRemove, dynamoScan } from "./dynamoUtil";
import { getMinimal } from "./dynamoHelpers";

const PODIUM_FINISHES = 'podiumFinishes'
const H2H = 'h2h';

export const dyGetPodiumFinishes = async () => {
    return await dyGetMetaField(PODIUM_FINISHES);
};



export const dyPutSummitMetadata = async (statStore: iStatStore) => {
    await dyPutMetaField(PODIUM_FINISHES, statStore.podiumFinishes);
    await dyPutMetaField(H2H, statStore.h2h);

};

export const dyPutTourney = async (tourney: iTournament) => {
    const marshalled = marshall({
        ...tourney.tournament
    });
    const input = {
        TableName: 'SummitTourneys',
        Item: marshalled
    };
    return await dynamoPut(input);
};





// Insert player with win/loss
// Could batch update these, but
// not super time sensitive
// player shape: {playerName, w, l}
export const dyPutPlayer = async (player: iPlayer) => {
    const marshalled = marshall({
        ...player
    });
    const input = {
        TableName: 'SummitPlayers',
        Item: marshalled
    };
    return await dynamoPut(input);
};

// Delete all Player entries in Dynamo
// 
export const dyRemovePlayer = async (playerName: string) => {
    const input = {
        TableName: 'SummitPlayers',
        Key: marshall({
            playerName
        })
    };

    const resp = await dynamoRemove(input);
    if ('value' in resp) {
        return resp['value'];
    } else {
        return null;
    }
};



export const dyMockApiPut = async (endpoint: string, resp: any) => {
    const minimalData = getMinimal(endpoint, resp);
    const marshalled = marshall({
        url: endpoint,
        data: minimalData
    });
    const input = {
        TableName: 'SummitAPIMock',
        Item: marshalled
    };

    return await dynamoPut(input);
};

export const dyMockApiGet = async (endpoint: string) => {
    const input = {
        TableName: 'SummitAPIMock',
        Key: marshall({
            url: endpoint
        })
    };
    const response = await dynamoGet(input);
    if ('data' in response) {
        return response.data
    }
    return response;
};

export const dyGetAllPlayers = async () => {
    const input = {
        TableName: 'SummitPlayers',
    };
    const response = await dynamoScan(input) as iPlayer[];
    return {
        players: response
    };
};

export const dyGetAllTourneys = async () => {
    const input = {
        TableName: 'SummitTourneys',
    };
    const response = await dynamoScan(input) as iTournamentData[];
    return {
        tournaments: response
    };
};

export const dyGetTourney = async (tourneyId: number) => {
    const input = {
        TableName: 'SummitTourneys',
        Key: marshall({
            id: tourneyId
        })
    };
    return await dynamoGet(input);
};

export const dyGetMetaField = async (key: string) => {
    const input = {
        TableName: 'SummitMetadata',
        Key: marshall({
            key
        })
    };

    const resp = await dynamoGet(input);
    if ('value' in resp) {
        return resp['value'];
    } else {
        return null;
    }
};

export const dyPutMetaField = async (key: string, value: any) => {
    const marshalled = marshall({
        key,
        value
    });
    const input = {
        TableName: 'SummitMetadata',
        Item: marshalled
    };
    return await dynamoPut(input);

};

export const dyUpdateTourney = async (tourneyId: number, args: { [key: string]: string }) => {
    const getInput = {
        TableName: 'SummitTourneys',
        Key: marshall({
            id: tourneyId
        })
    };
    const curValue = await dynamoGet(getInput);
    const newVal = Object.assign(curValue, args);
    const marshalled = marshall(newVal);
    const putInput = {
        TableName: 'SummitTourneys',
        Item: marshalled
    };
    await dynamoPut(putInput);

    return newVal;
};

