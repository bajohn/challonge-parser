import { describe, expect, test, jest } from '@jest/globals';

import { apiSource, iStatStore, iTournament, iMatch, iParticipant } from "../../../src-shared/types";
import { fetchMatches, fetchParticipants } from "../../lib/doFetch";

import { addTourneyToStatStore } from "../../lib/addTourney";
import { emptyStatStore } from "../../lib/generateStatStore";
import { tourney1Matches, tourney1Participants, tourney2Matches, tourney2Participants, oneTourneyH2H, twoTourneyH2H } from "./tourneydata"

jest.mock('../../lib/doFetch'); // magic 


const mockedFetchMatches = jest.mocked(fetchMatches);
const mockedFetchParticipants = jest.mocked(fetchParticipants);


mockedFetchMatches.mockImplementation(async (endpoint: string, apiSource: apiSource): Promise<iMatch[]> => {
    const resp = {
        'tournaments/tourney1/matches.json': tourney1Matches,
        'tournaments/tourney2/matches.json': tourney2Matches
    }[endpoint];
    if (typeof resp === 'undefined') {
        throw Error(`Unknown endpoint ${endpoint}`);
    }
    return resp;
});

mockedFetchParticipants.mockImplementation(async (endpoint: string, apiSource: apiSource): Promise<iParticipant[]> => {
    const resp = {
        'tournaments/tourney1/participants.json': tourney1Participants,
        'tournaments/tourney2/participants.json': tourney2Participants
    }[endpoint];
    if (typeof resp === 'undefined') {
        throw Error(`Unknown endpoint ${endpoint}`);
    }
    return resp;
});

const tourneyFactory = (tourneyNum: number): iTournament => {
    return {
        'tournament':
        {
            'id': `tourney${tourneyNum}`,
            'name': `Tournament ${tourneyNum}`,
            'rankedParticipants': [],
            'state': 'complete'
        }
    };
}

// mockedCleanName.mockImplementation((name: string) => {
//     return name;
// });

test('getMatches is mocked properly.', async () => {
    const matches = await fetchMatches('tournaments/tourney1/matches.json', 'dynamo');
    expect(matches).toEqual(tourney1Matches);
});

test('getParticipants is mocked properly.', async () => {
    const participants = await fetchParticipants('tournaments/tourney1/participants.json', 'dynamo');
    expect(participants).toEqual(tourney1Participants);
});

test('Can add a tournament to an empty statStore object', async () => {
    let statStore = emptyStatStore();
    statStore = await addTourneyToStatStore(tourneyFactory(1), statStore, 'dynamo')
    expect(statStore.podiumFinishes).toEqual({
        "First Place Finishes": {
            "Player 4": 1
        },
        "Second Place Finishes": {
            "Player 1": 1
        },
        "Third Place Finishes": {
            "Player 2": 1,
            "Player 3": 1
        }
    });

    expect(statStore.h2h).toEqual(oneTourneyH2H);
});

test('Can add two tournaments to an empty statStore object', async () => {
    let statStore = emptyStatStore();
    statStore = await addTourneyToStatStore(tourneyFactory(1), statStore, 'dynamo');
    statStore = await addTourneyToStatStore(tourneyFactory(2), statStore, 'dynamo')
    expect(statStore.podiumFinishes).toEqual({
        "First Place Finishes": {
            "Player 3": 1,
            "Player 4": 1
        },
        "Second Place Finishes": {
            "Player 1": 1,
            "Player 4": 1
        },
        "Third Place Finishes": {
            "Player 1": 1,
            "Player 2": 2,
            "Player 3": 1
        }
    });
    expect(statStore.h2h).toEqual(twoTourneyH2H);
});