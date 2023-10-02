const { getPodiumFinishes, getAllPlayers } = require("../lib/dynamo");


exports.handler = async (event, context) => {
    console.log(event);
    const path = event['pathParameters']['proxy'];
    const queryParams = event['queryStringParameters'];

    const routedResp = await router(path, queryParams)
    const res = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*'
        },
        "body": JSON.stringify({
            ...routedResp
        })
    };
    console.log(res);
    return res;
}

const router = async (path, queryParams) => {
    if (path === 'get-players') {
        return await getAllPlayers()
    } else if (path === 'podium-finishes') {
        return await getPodiumFinishes()
    }
    return {
        'error': 'unkown endpoint'
    }
}