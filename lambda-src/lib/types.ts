//import { FIRST_PLACE, SECOND_PLACE, THIRD_PLACE } from "../constants/constants";


type apiSource = 'DYNAMO' | 'CHALLONGE';


// Types provided from Challonge API
interface iTournament {
    tournament: {
        name: string
        id: string
        state: 'complete' // there are other states if needed, only using complete
    }
}

interface iMatch {
    match: {
        id: number
        tournament_id: number
        player1_id: number,
        player2_id: number,
        winner_id: number
        loser_id: number
    }
}

type endpoint = 'tournaments'

// interface iChallongeResp {
//     'tournaments': iTournament[]
// }



interface podiumFinishes {
    'First Place Finishes':
    { [index: string]: number }
    'Second Place Finishes':
    { [index: string]: number }
    'Third Place Finishes':
    { [index: string]: number }
}

interface h2h {
    [myName: string]: {
        [opponentName: string]: {
            w: number
            l: number
        }
    }
}

interface iStatStore {
    podiumFinishes: podiumFinishes
    h2h: h2h
}

interface iParticipant {
    participant: {
        id: number
        name: string
        final_rank: number
    }
}

interface cleanedNames {
    [id: number]: string
}

type firstPlace = 'First Place Finishes';
type secondPlace = 'Second Place Finishes';
type thirdPlace = 'Third Place Finishes';
type podiumPlaces = firstPlace | secondPlace | thirdPlace;
