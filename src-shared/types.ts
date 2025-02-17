import { FIRST_PLACE, SECOND_PLACE, THIRD_PLACE } from "./constants";



export type apiSource = 'dynamo' | 'challonge';



export interface iTournamentData {
    name: string
    id: number
    url: string
    tournament_type: string
    state: 'complete', // there are other states if needed, only using complete
    videoLink?: string // Non challonge native
    created_at: string
    updated_at: string
    started_at: string
    completed_at: string
    participants_count: number
    game_name: string
    /** Maps ranking in the tournament to an array of players who finished with that ranking.
     * 
     * Indexed on numeric rank number (ie 1 for First place, 2 for Second Place).
     * 
     * Note this means 0 will never be defined, and other indices may be skipped.
     */
    rankedParticipants?: { [index: number]: string[] }
}

// Types provided from Challonge API,
// with fields added for this app.
export interface iTournament {
    tournament: iTournamentData
}


export interface iMatch {
    match: {
        // id: number
        //tournament_id: number
        player1_id: number,
        player2_id: number,
        winner_id: number

        started_at: string,
        tournament_id: number,
        url: string
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

export interface iMatchMin {
    match: {
        player1_id: number,
        player2_id: number,
        winner_id: number
    }
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

export interface iH2h {
    [myName: string]: iH2hOpp
}

export interface iH2hOpp {
    [opponentName: string]: iH2hElement
}

export interface iH2hElement {
    'w': number,
    'l': number // Did the subject win or lose this match
    // result: 'w' | 'l' // Did the subject win or lose this match
    // started_at: string
    // tournament_id: number
    // url: string
}

export interface iStatStore {
    podiumFinishes: podiumFinishes
    h2h: iH2h
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
