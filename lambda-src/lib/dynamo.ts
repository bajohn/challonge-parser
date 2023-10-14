const { DynamoDBClient,
    ListTablesCommand,
    PutItemCommand,
    GetItemCommand,
    ScanCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const podiumFinishes = 'podiumFinishes'
exports.getPodiumFinishes = async () => {
    const client = new DynamoDBClient({ region: 'us-west-2' });
    const input = {
        TableName: 'SummitPodiumFinishes',
        Key: marshall({
            podiumFinishes
        })
    };

    const command = new GetItemCommand(input);

    const response = await client.send(command);
    const unmarshalled = unmarshall(response.Item);
    return unmarshalled
};



exports.putPodiumFinishes = async (statStore: iStatStore) => {
    const client = new DynamoDBClient({ region: 'us-west-2' });
    const marshalled = marshall({
        podiumFinishes,
        data: statStore.podiumFinishes
    });
    const input = {
        TableName: 'SummitPodiumFinishes',
        Item: marshalled
    };
    const command = new PutItemCommand(input);
    const response = await client.send(command);
    return response
};






// Insert player with win/loss
// Could batch update these, but
// not super time sensitive
// player shape: {playerName, w, l}
exports.putPlayer = async (player) => {
    const client = new DynamoDBClient({ region: 'us-west-2' });

    const marshalled = marshall({
        ...player
    });
    const input = {
        TableName: 'SummitPlayers',
        Item: marshalled
    };
    const command = new PutItemCommand(input);
    const response = await client.send(command);
    return response;
};

const getMinimal = (endpoint, resp) => {
    if (endpoint.indexOf('matches') > -1) {
        return resp.map(el => {
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
}

exports.mockApiPut = async (endpoint, resp) => {
    const client = new DynamoDBClient({ region: 'us-west-2' });
    const minimalData = getMinimal(endpoint, resp);
    const marshalled = marshall({
        url: endpoint,
        data: minimalData
    });
    const input = {
        TableName: 'SummitAPIMock',
        Item: marshalled
    };
    const command = new PutItemCommand(input);
    const response = await client.send(command);
    return response;
};

exports.mockApiGet = async (endpoint) => {
    const client = new DynamoDBClient({ region: 'us-west-2' });
    const input = {
        TableName: 'SummitAPIMock',
        Key: marshall({
            url: endpoint
        })
    };

    const command = new GetItemCommand(input);

    const response = await client.send(command);
    if ('Item' in response) {
        const unmarshalled = unmarshall(response.Item);
        return unmarshalled.data;
    } else {
        console.log(`Key not found in Dynamo: ${endpoint}`);
        return {};
    }
};

exports.getAllPlayers = async () => {
    const client = new DynamoDBClient({ region: 'us-west-2' });
    const input = {
        TableName: 'SummitPlayers',
    };
    const command = new ScanCommand(input);
    const response = await client.send(command);
    return {
        players: response['Items'].map(el => unmarshall(el))
    };
};






// Store key/val metadata in a table
// So far unused
// exports.getMetadata = async (keyIn) => {
//     const client = new DynamoDBClient({ region: 'us-west-2' });
//     const input = {
//         TableName: 'SummitMetadata',
//         Key: marshall({
//             key: keyIn
//         })
//     };

//     const command = new GetItemCommand(input);

//     const response = await client.send(command);
//     const unmarshalled = unmarshall(response.Item);
//     return unmarshalled.value
// };



// exports.putMetadata = async (keyIn, valIn) => {
//     const client = new DynamoDBClient({ region: 'us-west-2' });
//     const marshalled = marshall(
//         {
//             key: keyIn,
//             value: valIn
//         }
//     );
//     const input = {
//         TableName: 'SummitMetadata',
//         Item: marshalled
//     };
//     const command = new PutItemCommand(input);
//     const response = await client.send(command);
//     return response
// };

