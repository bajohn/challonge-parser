import { cleanName } from "../constants/cleanName.js";

// Update the h2h stats for all the matches
// of a single tournament.
// Only store first name, second name alphabetically, ie 
//     a   b   c 
// a   x   1   1
// b   0   x   1
// c   0   0   x
export const parseh2h = (statStoreIn, matches, participants) => {
    let statStore = Object.assign({}, statStoreIn);

    if (!('h2h' in statStore)) {
        statStore['h2h'] = {};
    }
    const h2h = statStore['h2h'];
    for (const el of matches) {
        const match = el['match'];
        const player1Name = getName(match['player1_id'], participants);
        const player2Name = getName(match['player2_id'], participants);

        const winnerName = getName(match['winner_id'], participants);
        const sorted = [player1Name, player2Name].sort();

        const keyName = sorted[0];
        const nonKeyName = sorted[1];

        if (!(keyName in h2h)) {
            h2h[keyName] = {};
        }
        if (!(nonKeyName in h2h[keyName])) {
            h2h[keyName][nonKeyName] = {
                wins: 0,
                losses: 0
            };
        }
        const resultRef = h2h[keyName][nonKeyName];

        if (winnerName === keyName) {
            resultRef['wins'] += 1;
        } else {
            resultRef['losses'] += 1;
        }
    }
    return statStore;
};

const getName = (playerId, participants) => {
    for (const el of participants) {
        const participant = el['participant'];
        if (participant['id'] === playerId) {
            return cleanName(participant['name']);
        }
    }
    throw (`Error - name not found for ID: ${participant['id']}`);
}