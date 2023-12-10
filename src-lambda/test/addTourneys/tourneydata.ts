import { apiSource, iStatStore, iTournament, iMatch, iParticipant, podiumFinishes, h2h } from "../../../src-shared/types";




// Small mock tournament
// 4 Players
// Outcome:
// 
// Match1: 1v2 -> 1 wins
// Match2: 3v4 -> 4 wins
// Match3: 1v4 -> 4 wins
// 
//
export const tourney1Matches: iMatch[] = [
    // Match1
    {
        match: {
            player1_id: 1,
            player2_id: 2,
            winner_id: 1
        },
    },
    // Match2
    {
        match: {
            player1_id: 3,
            player2_id: 4,
            winner_id: 4
        },
    },
    // Match3 (Final)
    {
        match: {
            player1_id: 1,
            player2_id: 4,
            winner_id: 4
        },
    },
];

// Another small mock tournament
// 4 Players
// Outcome:
// 
// Match1: 1v3 -> 3 wins
// Match2: 2v4 -> 4 wins
// Match3: 3v4 -> 3 wins
// 
//
export const tourney2Matches: iMatch[] = [
    // Match1
    {
        match: {
            player1_id: 1,
            player2_id: 3,
            winner_id: 3
        },
    },
    // Match2
    {
        match: {
            player1_id: 2,
            player2_id: 4,
            winner_id: 4
        },
    },
    // Match3 (Final)
    {
        match: {
            player1_id: 3,
            player2_id: 4,
            winner_id: 3
        },
    },
];

export const tourney1Participants: iParticipant[] = [
    {
        participant: {
            final_rank: 2,
            id: 1,
            name: 'Player 1'
        }
    },
    {
        participant: {
            final_rank: 3,
            id: 2,
            name: 'Player 2'
        }
    },
    {
        participant: {
            final_rank: 3,
            id: 3,
            name: 'Player 3'
        }
    },
    {
        participant: {
            final_rank: 1,
            id: 4,
            name: 'Player 4'
        }
    }
];

export const oneTourneyH2H = {
    "Player 1": {
        "Player 2": {
            "w": 1,
            "l": 0
        },
        "Player 4": {
            "w": 0,
            "l": 1
        },
        "Player 1": {
            "w": 0,
            "l": 0
        },
        "Player 3": {
            "w": 0,
            "l": 0
        }
    },
    "Player 2": {
        "Player 1": {
            "w": 0,
            "l": 1
        },
        "Player 2": {
            "w": 0,
            "l": 0
        },
        "Player 3": {
            "w": 0,
            "l": 0
        },
        "Player 4": {
            "w": 0,
            "l": 0
        }
    },
    "Player 3": {
        "Player 4": {
            "w": 0,
            "l": 1
        },
        "Player 1": {
            "w": 0,
            "l": 0
        },
        "Player 2": {
            "w": 0,
            "l": 0
        },
        "Player 3": {
            "w": 0,
            "l": 0
        }
    },
    "Player 4": {
        "Player 3": {
            "w": 1,
            "l": 0
        },
        "Player 1": {
            "w": 1,
            "l": 0
        },
        "Player 2": {
            "w": 0,
            "l": 0
        },
        "Player 4": {
            "w": 0,
            "l": 0
        }
    }
}




export const tourney2Participants: iParticipant[] = [
    {
        participant: {
            final_rank: 3,
            id: 1,
            name: 'Player 1'
        }
    },
    {
        participant: {
            final_rank: 3,
            id: 2,
            name: 'Player 2'
        }
    },
    {
        participant: {
            final_rank: 1,
            id: 3,
            name: 'Player 3'
        }
    },
    {
        participant: {
            final_rank: 2,
            id: 4,
            name: 'Player 4'
        }
    }
];

export const twoTourneyH2H = {
    "Player 1": {
        "Player 2": {
            "w": 1,
            "l": 0
        },
        "Player 4": {
            "w": 0,
            "l": 1
        },
        "Player 1": {
            "w": 0,
            "l": 0
        },
        "Player 3": {
            "w": 0,
            "l": 1
        }
    },
    "Player 2": {
        "Player 1": {
            "w": 0,
            "l": 1
        },
        "Player 2": {
            "w": 0,
            "l": 0
        },
        "Player 3": {
            "w": 0,
            "l": 0
        },
        "Player 4": {
            "w": 0,
            "l": 1
        }
    },
    "Player 3": {
        "Player 4": {
            "w": 1,
            "l": 1
        },
        "Player 1": {
            "w": 1,
            "l": 0
        },
        "Player 2": {
            "w": 0,
            "l": 0
        },
        "Player 3": {
            "w": 0,
            "l": 0
        }
    },
    "Player 4": {
        "Player 3": {
            "w": 1,
            "l": 1
        },
        "Player 1": {
            "w": 1,
            "l": 0
        },
        "Player 2": {
            "w": 1,
            "l": 0
        },
        "Player 4": {
            "w": 0,
            "l": 0
        }
    }
};




// for tourney 1,2
export const testPodiumFinishes: podiumFinishes = {
    'First Place Finishes':
    {
        'Player 3': 1,
        'Player 4': 1
    },
    'Second Place Finishes':
    {
        'Player 1': 1,
        'Player 4': 1
    },
    'Third Place Finishes': {
        'Player 3': 1,
        'Player 2': 2,
        'Player 1': 1
    }
};

// tourney array for tourneys 1,2
export const testTourneys: iTournament[] = [{
    "tournament": {
        "id": 1,
        "name": "Tournament 1",
        "rankedParticipants":
            [,
                ["Player 4"],
                ["Player 1"],
                ["Player 2", "Player 3"]],
        "state": "complete"
    }
},
{
    "tournament": {
        "id": 2,
        "name": "Tournament 2",
        "rankedParticipants":
            [,
                ["Player 3"],
                ["Player 4"],
                ["Player 1", "Player 2"]],
        "state": "complete"
    }
}];

// h2h for tourneys 1,2
export const testh2h: h2h = {
    "Player 1": {
        "Player 2": {
            "w": 1,
            "l": 0
        },
        "Player 4": {
            "w": 0,
            "l": 1
        },
        "Player 1": {
            "w": 0,
            "l": 0
        },
        "Player 3": {
            "w": 0,
            "l": 1
        }
    },
    "Player 2": {
        "Player 1": {
            "w": 0,
            "l": 1
        },
        "Player 2": {
            "w": 0,
            "l": 0
        },
        "Player 3": {
            "w": 0,
            "l": 0
        },
        "Player 4": {
            "w": 0,
            "l": 1
        }
    },
    "Player 3": {
        "Player 4": {
            "w": 1,
            "l": 1
        },
        "Player 1": {
            "w": 1,
            "l": 0
        },
        "Player 2": {
            "w": 0,
            "l": 0
        },
        "Player 3": {
            "w": 0,
            "l": 0
        }
    },
    "Player 4": {
        "Player 3": {
            "w": 1,
            "l": 1
        },
        "Player 1": {
            "w": 1,
            "l": 0
        },
        "Player 2": {
            "w": 1,
            "l": 0
        },
        "Player 4": {
            "w": 0,
            "l": 0
        }
    }
};

