import { FULL_RELOAD, FULL_RELOAD_STATUS_PATH, UPDATE_IN_PROG } from "../../src-shared/constants";
import { invokeDynamoReload } from "../lib-api/invokeDynamoReload";
import { getPodiumFinishes, getAllPlayers, getMetaField, putMetaField, getAllTourneys } from "../lib/dynamo";
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
    return res;
}

export const router = async (path: string, method: string, queryParams: { [key: string]: string }, body: string) => {
    if (path === 'get-players') {
        return await getAllPlayers()
    } else if (path === 'podium-finishes') {
        return await getPodiumFinishes()
    } else if (path === FULL_RELOAD) {
        const updateStatus = await getMetaField(FULL_RELOAD_STATUS_PATH)
        if (updateStatus === UPDATE_IN_PROG) {
            return {
                status: 'blocked'
            }
        }
        await putMetaField(FULL_RELOAD_STATUS_PATH, UPDATE_IN_PROG);
        await invokeDynamoReload(); //TODO removed for testing
        return {
            status: 'kicked_off',
        }

    }
    else if (path === 'get-tourneys') {
        return await getAllTourneys()
    }

    else if (path.includes('update-status')) {
        const status = await getMetaField(path);
        return { status };
    }
    // TODO return status 404 here:
    return {
        'error': 'unkown endpoint'
    }
}