const { getPodiumFinishes, putPodiumFinishes, putPlayer } = require("../lib/dynamo");
const { getAllNames } = require("../lib/h2h");
const { doIterate } = require("../lib/iterateTournaments");
const { getWinLoss } = require("../lib/parseWinLoss");

exports.handler = async (event, context) => {
    const statStore = await doIterate();
    // await putPodiumFinishes(statStore);
    // const resp = await getPodiumFinishes()
    // const names = getAllNames(statStore);
    const players = getWinLoss(statStore);
    // for (const player of players) {
    //     putPlayer(player);
    // }
    console.log(players)
};