import { FIRST_PLACE, SECOND_PLACE, THIRD_PLACE } from "./constants";



export type apiSource = 'dynamo' | 'challonge';


// Types provided from Challonge API
export interface iTournament {
    tournament: {
        name: string
        id: string
        state: 'complete', // there are other states if needed, only using complete
        videoLink?: string
        rankedParticipants: string[][]
    }
}

export interface iMatch {
    match: {
        // id: number
        //tournament_id: number
        player1_id: number,
        player2_id: number,
        winner_id: number
        //loser_id: number
    }
}
//////////


// object pushed to SummitPlayers Dynamo 
export interface iPlayer {
    playerName: string
    w: number
    l: number
}

// interface iChallongeResp {
//     'tournaments': iTournament[]
// }



export interface podiumFinishes {
    'First Place Finishes':
    { [index: string]: number }
    'Second Place Finishes':
    { [index: string]: number }
    'Third Place Finishes':
    { [index: string]: number }
}

export interface h2h {
    [myName: string]: {
        [opponentName: string]: {
            w: number
            l: number
        }
    }
}

export interface iStatStore {
    podiumFinishes: podiumFinishes
    h2h: h2h
    tourneys: iTournament[]
}

export interface iParticipant {
    participant: {
        id: number
        name: string
        final_rank: number
    }
}

export interface cleanedNames {
    [id: number]: string
}

export type firstPlace = 'First Place Finishes';
export type secondPlace = 'Second Place Finishes';
export type thirdPlace = 'Third Place Finishes';
export type podiumPlaces = firstPlace | secondPlace | thirdPlace;
