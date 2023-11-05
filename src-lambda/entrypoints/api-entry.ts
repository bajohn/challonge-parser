import { UPDATE_IN_PROG } from "../constants/constants";
import { invokeDynamoReload } from "../lib-api/invokeDynamoReload";
import { getPodiumFinishes, getAllPlayers, getMetaField, putMetaField } from "../lib/dynamo";
import { APIGatewayProxyEventBase, Handler } from 'aws-lambda';



export const apiHandler: Handler = async (event: APIGatewayProxyEventBase<any>, context) => {
    const path = event['pathParameters']['proxy'];
    const queryParams = event['queryStringParameters'];
    const body = event['body']
    const method = event['httpMethod'];

    const routedResp = await router(path, method, queryParams, body)
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

export const router = async (path: string, method: string, queryParams: { [key: string]: string }, body: string) => {
    if (path === 'get-players') {
        return await getAllPlayers()
    } else if (path === 'podium-finishes') {
        return await getPodiumFinishes()
    } else if (path === 'reload-dynamo') {
        const updateStatus = await getMetaField('updateStatus')
        console.log(updateStatus)
        if (updateStatus === UPDATE_IN_PROG) {
            return {
                status: 'blocked'
            }
        }
        await putMetaField('updateStatus', UPDATE_IN_PROG);
        await invokeDynamoReload();



        return {
            status: 'kicked_off',
        }

    } 
    // else if (path === 'get-last-updated') {
    //     return await getMetaField('lastUpdated')
    // }
    else if (path === 'get-update-status') {
        const status = await getMetaField('updateStatus');
        return { status };
    }
    // TODO return status 404 here:
    return {
        'error': 'unkown endpoint'
    }
}