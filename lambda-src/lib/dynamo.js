const { DynamoDBClient,
    ListTablesCommand,
    PutItemCommand,
    GetItemCommand } = require("@aws-sdk/client-dynamodb");
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



exports.putPodiumFinishes = async (statStore) => {
    const client = new DynamoDBClient({ region: 'us-west-2' });
    const marshalled = marshall({
        podiumFinishes,
        data: statStore.podiumFinishes
    });
    console.log(marshalled);
    const input = {
        TableName: 'SummitPodiumFinishes',
        Item: marshalled
    };
    const command = new PutItemCommand(input);
    const response = await client.send(command);
    console.log(response);
    return response
};

// Insert player with win/loss
// Could batch update these, but
// not super time sensitive
// player shape: {playerName, w, l}
exports.putPlayer = async (player) => {
    const client = new DynamoDBClient({ region: 'us-west-2' });

    const marshalled = marshall({
        player
    });
    console.log(marshalled);
    const input = {
        TableName: 'SummitPodiumFinishes',
        Item: marshalled
    };
    const command = new PutItemCommand(input);
    const response = await client.send(command);
    console.log(response);
    return response
}