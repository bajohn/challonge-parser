const { isTesting, getIsTesting } = require("../constants/constants");
const { getPodiumFinishes, putPodiumFinishes, putPlayer, getAllPlayers } = require("../lib/dynamo");
const { getAllNames } = require("../lib/h2h");
const { generateStatStore } = require("../lib/generateStatStore");
const { getWinLoss } = require("../lib/parseWinLoss");

exports.handler = async (event, context) => {
    // const source = 'challonge';
    const source = 'dynamo';
    const statStore = await generateStatStore(source);
    console.log(JSON.stringify(statStore));
    await putPodiumFinishes(statStore);

    const players = getWinLoss(statStore);
    await Promise.all(players.map(player=>putPlayer(player)))
    console.log('Done');
};
