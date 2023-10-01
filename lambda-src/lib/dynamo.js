const { DynamoDBClient,
    ListTablesCommand,
    PutItemCommand,
    GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const podiumFinishes = 'podiumFinishes'
exports.getPodiumFinishes = async () => {
    const client = new DynamoDBClient({ region: 'us-west-2' });
    const input = {
        TableName: 'PodiumFinishes',
        Key: marshall({
            podiumFinishes
        })
    };

    const command = new GetItemCommand(input);

    const response = await client.send(command);
    const unmarshalled = unmarshall(response.Item);
    console.log(unmarshalled);
    return unmarshalled
};

exports.putPodiumFinishes = async () => {
    const client = new DynamoDBClient({ region: 'us-west-2' });

    // const input = {
    // };
    // const command = new ListTablesCommand(input);

    const marshalled = marshall({
        podiumFinishes,
        data: {
            'First Place Finishes': {
                Campbell: 8,
                Adel: 9,
                Parker: 1,
                Joshua: 1,
                Sean: 1
            },
            'Second Place Finishes': {
                Sean: 1,
                Brendan: 5,
                Adel: 5,
                Luis: 7,
                Adam: 3,
                Marcus: 2,
                Woody: 1,
                Darren: 1,
                Campbell: 1,
                Joshua: 1,
                Edward: 1
            },
            'Third Place Finishes': {
                Joshua: 2,
                Adel: 4,
                Adam: 4,
                Luis: 3,
                Tommy: 1,
                Sean: 2,
                Brendan: 5,
                Darren: 1,
                Chris: 1,
                Edward: 2,
                Martin: 4,
                Lily: 3,
                Campbell: 1,
                Spencer: 1,
                Alex: 1,
                James: 1
            }
        }
    });
    console.log(marshalled);
    const input = {
        TableName: 'PodiumFinishes',
        Item: marshalled
    };

    const command = new PutItemCommand(input);

    const response = await client.send(command);

    console.log(response);
    return response
};