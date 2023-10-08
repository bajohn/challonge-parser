exports.podiumLookup = () => {
    return {
        1: 'First Place Finishes',
        2: 'Second Place Finishes',
        3: 'Third Place Finishes'
    }
}

let isTesting = false;

exports.setIsTesting = (input) => {
    isTesting = input;
}

exports.getIsTesting = () => {
    return isTesting;
}