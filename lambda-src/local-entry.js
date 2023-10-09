const { setIsTesting, isTesting, getIsTesting } = require('./constants/constants');
const { handler } = require('./entrypoints/updater-lambda')
const { doIterate } = require('./lib/generateStatStore')
setIsTesting(true);
handler();