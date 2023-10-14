import { getPodiumFinishes, getAllPlayers } from "../lib/dynamo";
import { Handler } from 'aws-lambda';


export const handler: Handler = async (event, context) => {
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

const router = async (path: string, queryParams: { [key: string]: string }) => {
    if (path === 'get-players') {
        return await getAllPlayers()
    } else if (path === 'podium-finishes') {
        return await getPodiumFinishes()
    }
    return {
        'error': 'unkown endpoint'
    }
}