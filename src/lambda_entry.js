const { main } = require("./main");


exports.handler = async(event, context)=>{
    await main();
}