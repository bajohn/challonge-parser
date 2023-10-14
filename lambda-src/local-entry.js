const { setIsTesting } = require('./constants/constants');
const { handler } = require('./entrypoints/updater-lambda')

setIsTesting(true);
handler();
console.log('hi');