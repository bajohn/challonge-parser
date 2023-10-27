import { reloadDynamo } from "../lib-api/reloadDynamo";
import { getPodiumFinishes, getAllPlayers } from "../lib/dynamo";
import { updateDynamo } from "../lib/updateDynamo";
import { APIGatewayProxyEventBase, Handler } from 'aws-lambda';



export const apiHandler: Handler = async (event: APIGatewayProxyEventBase<any>, context) => {
    console.log(event);
    const path = event['pathParameters']['proxy'];
    const queryParams = event['queryStringParameters'];
    const method = event['httpMethod'];

    const routedResp = await router(path, method, queryParams)
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

export const router = async (path: string, method: string, queryParams: { [key: string]: string }) => {
    if (path === 'get-players') {
        return await getAllPlayers()
    } else if (path === 'podium-finishes') {
        return await getPodiumFinishes()
    } else if (path === 'reload-dynamo') {
        // await updateDynamo(true);
        reloadDynamo();

    }
    // TODO return status 404 here:
    return {
        'error': 'unkown endpoint'
    }
}