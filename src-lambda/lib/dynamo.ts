import { iMatch, iPlayer, iStatStore } from "../../src-shared/types";


import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamoGet, dynamoPut, dynamoScan } from "./dynamoUtil";

const podiumFinishes = 'podiumFinishes'

export const getPodiumFinishes = async () => {
    const input = {
        TableName: 'SummitPodiumFinishes',
        Key: marshall({
            podiumFinishes
        })
    };
    return await dynamoGet(input);
};



export const putPodiumFinishes = async (statStore: iStatStore) => {
    const marshalled = marshall({
        podiumFinishes,
        data: statStore.podiumFinishes
    });
    const input = {
        TableName: 'SummitPodiumFinishes',
        Item: marshalled
    };
    return await dynamoPut(input);
};






// Insert player with win/loss
// Could batch update these, but
// not super time sensitive
// player shape: {playerName, w, l}
export const putPlayer = async (player: iPlayer) => {
    const marshalled = marshall({
        ...player
    });
    const input = {
        TableName: 'SummitPlayers',
        Item: marshalled
    };
    return await dynamoPut(input);
};

// Store only needed fields in Dynamo
const getMinimal = (endpoint: string, resp: any[]) => {
    if (endpoint.indexOf('matches') > -1) {
        return resp.map((el: iMatch): iMatch => {
            const match = el.match;
            return {
                match: {
                    player1_id: match.player1_id,
                    player2_id: match.player2_id,
                    winner_id: match.winner_id
                }

            }
        });
    }
    else if (endpoint.indexOf('participants') > -1) {
        return resp.map(el => {
            const participant = el.participant;
            return {
                participant: {
                    id: participant.id,
                    final_rank: participant.final_rank,
                    name: participant.name
                }
            }
        });
    }
    return resp;
};


export const mockApiPut = async (endpoint: string, resp: any) => {
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

export const mockApiGet = async (endpoint: string) => {
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

export const getAllPlayers = async () => {
    const input = {
        TableName: 'SummitPlayers',
    };
    const response = await dynamoScan(input);
    return {
        players: response.map((el: any) => unmarshall(el))
    };
};

export const getMetaField = async (key: string) => {
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

export const putMetaField = async (key: string, value: any) => {
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


