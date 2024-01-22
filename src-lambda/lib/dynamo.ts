import { h2h, iMatch, iParticipant, iPlayer, iStatStore, iTournament } from "../../src-shared/types";


import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamoGet, dynamoPut, dynamoRemove, dynamoScan } from "./dynamoUtil";

const PODIUM_FINISHES = 'podiumFinishes'
const H2H = 'h2h';

export const getPodiumFinishes = async () => {
    return await getMetaField(PODIUM_FINISHES);
};



export const putSummitMetadata = async (statStore: iStatStore) => {
    await putMetaField(PODIUM_FINISHES, statStore.podiumFinishes);
    await putMetaField(H2H, statStore.h2h);

};

export const putTourney = async (tourney: iTournament) => {
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

// Delete all Player entries in Dynamo
// 
export const removePlayer = async (playerName: string) => {
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

// Store only needed fields in Dynamo
export const getMinimal = (endpoint: string, resp: any[]) => {
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
        return resp.map((el: iParticipant) => {
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
    else if (endpoint.indexOf('tournament') > -1) {
        return resp.map((el: iTournament) => {
            const tournament = el.tournament;
            return {
                tournament: {
                    name: tournament.name,
                    id: tournament.id,
                    url: tournament.url,
                    tournament_type: tournament.tournament_type,
                    state: tournament.state,
                    created_at: tournament.created_at,
                    updated_at: tournament.updated_at,
                    started_at: tournament.started_at,
                    completed_at: tournament.completed_at,
                    participants_count: tournament.participants_count,
                    game_name: tournament.game_name
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
    const response = await dynamoScan(input) as iPlayer[];
    return {
        players: response
    };
};

export const getAllTourneys = async () => {
    const input = {
        TableName: 'SummitTourneys',
    };
    const response = await dynamoScan(input) as iTournament[];
    return {
        tournaments: response.map(el => { return { tournament: el } })
    };
};

export const getTourney = async (tourneyId: number) => {
    const input = {
        TableName: 'SummitTourneys',
        Key: marshall({
            id: tourneyId
        })
    };
    return await dynamoGet(input);
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

export const updateTourney = async (tourneyId: number, args: { [key: string]: string }) => {
    const getInput = {
        TableName: 'SummitTourneys',
        Key: marshall({
            id: tourneyId
        })
    };
    console.log(getInput);
    const curValue = await dynamoGet(getInput);
    console.log(curValue);
    console.log('To update')
    console.log(tourneyId, args);
    const newVal = Object.assign(curValue, args);
    console.log('new val')
    console.log(newVal)
    const marshalled = marshall(newVal);
    const putInput = {
        TableName: 'SummitTourneys',
        Item: marshalled
    };
    await dynamoPut(putInput);

    return newVal;
};

