const { main } = require("./main");


exports.handler = async (event, context, callback) => {
    console.log(event)
    // await main();
    // return {
    //     success: true
    // }
    const res = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {},
        // "multiValueHeaders": { "headerName": ["headerValue", "headerValue2", ...], ... },
        "body": 'yo'
    }
    console.log(res);
    // return callback(
    //     null, res
    // );
    return res;
}