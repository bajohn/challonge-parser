import { getAllNames } from "./h2h";
import { iPlayer, iStatStore } from "../../src-shared/types";


// Return player win/loss
// from h2h object
export const getWinLoss = (statStore: iStatStore): iPlayer[] => {
    const names = getAllNames(statStore);
    const h2h = statStore['h2h']

    return names.map(name => {
        const winLoss = Object.keys(h2h[name]).reduce(
            (lv, cv) => {
                const cur = h2h[name][cv];
                lv['w'] += cur['w']
                lv['l'] += cur['l']
                return lv;
            }, { w: 0, l: 0 }
        );
        return {
            playerName: name,
            ...winLoss
        }
    });
};