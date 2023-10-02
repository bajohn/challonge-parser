const { getPodiumFinishes } = require("../lib/dynamo");


exports.handler = async (event, context) => {
    console.log(event)
    // return {
    //     success: true
    // }

    // return callback(
    //     null, res
    // );
    const dynamoResp = await getPodiumFinishes();

    const res = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*'
        },
        // "multiValueHeaders": { "headerName": ["headerValue", "headerValue2", ...], ... },
        "body": JSON.stringify({
            dynamoResp
        })
    };
    console.log(res);
    return res;
}