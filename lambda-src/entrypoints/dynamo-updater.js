const { getPodiumFinishes, putPodiumFinishes, putPlayer, getAllPlayers} = require("../lib/dynamo");
const { getAllNames } = require("../lib/h2h");
const { doIterate } = require("../lib/iterateTournaments");
const { getWinLoss } = require("../lib/parseWinLoss");

exports.handler = async (event, context) => {
    const statStore = await doIterate();
    // console.log(JSON.stringify(statStore));
    // await putPodiumFinishes(statStore);

    // const resp = await getPodiumFinishes()
    const names = getAllNames(statStore);
    const players = getWinLoss(statStore);
    // await Promise.all(players.map(player=>putPlayer(player)))
    console.log('Done');


};