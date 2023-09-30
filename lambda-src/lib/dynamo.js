const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");


exports.dynamo = async () => {
    const client = new DynamoDBClient({ region: 'us-west-2' });

    const input = {
    };
    const command = new ListTablesCommand(input);
    const response = await client.send(command);
    console.log(response);
};