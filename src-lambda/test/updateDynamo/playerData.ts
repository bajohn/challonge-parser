import { FIRST_PLACE, SECOND_PLACE, THIRD_PLACE } from '../../../src-shared/constants';

export const allPlayers = [
    {
        playerName: 'player 1',
        w: 1,
        l: 1
    },
    {
        playerName: 'player 2',
        w: 2,
        l: 0
    },
    {
        playerName: 'player 3',
        w: 0,
        l: 2
    },
];

export const newPlayers = [
    // Remove player 1 and 3, add player 4  
    {
        playerName: 'player 2',
        w: 2,
        l: 0
    },
    {
        playerName: 'player 4',
        w: 0,
        l: 2
    },
]

export const podiumFinishes = {
    [FIRST_PLACE]: { 'player 2': 1 },
    [SECOND_PLACE]: { 'player 1': 1 },
    [THIRD_PLACE]: { 'player 3': 1 }
}