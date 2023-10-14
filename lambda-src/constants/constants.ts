exports.podiumLookup = () => {
    return {
        1: 'First Place Finishes',
        2: 'Second Place Finishes',
        3: 'Third Place Finishes'
    }
}

exports.SUBDOMAIN = 'b71fc01980b13ee66eab1849';
exports.DYNAMO = 'dynamo';
exports.CHALLONGE = 'challonge';

let isTesting = false;

exports.setIsTesting = (input) => {
    isTesting = input;
}

exports.getIsTesting = () => {
    return isTesting;
}