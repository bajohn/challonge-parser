const { handler } = require('./entrypoints/dynamo-updater')
const { doIterate } = require('./lib/iterateTournaments')


handler();