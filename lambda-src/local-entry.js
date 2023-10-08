const { setIsTesting, isTesting, getIsTesting } = require('./constants/constants');
const { handler } = require('./entrypoints/dynamo-updater')
const { doIterate } = require('./lib/iterateTournaments')
setIsTesting(true);
handler();