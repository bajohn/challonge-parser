import { describe, expect, test, jest } from '@jest/globals';

import { apiSource, iStatStore, iTournament, iMatch, iParticipant } from "../../../src-shared/types";
import { fetchMatches, fetchParticipants } from "../../lib/challongeFetch";

import { addTourneyToStatStore } from "../../lib/addTourney";
import { emptyStatStore } from "../../lib/generateStatStore";
import { tourney1Matches, tourney1Participants, tourney2Matches, tourney2Participants, oneTourneyH2H, twoTourneyH2H, testPodiumFinishes } from "./tourneydata"

jest.mock('../../lib/challongeFetch'); // magic 


const mockedFetchMatches = jest.mocked(fetchMatches);
const mockedFetchParticipants = jest.mocked(fetchParticipants);


mockedFetchMatches.mockImplementation(async (endpoint: string, apiSource: apiSource): Promise<iMatch[]> => {
    const resp = {
        'tournaments/1/matches.json': tourney1Matches,
        'tournaments/2/matches.json': tourney2Matches
    }[endpoint];
    if (typeof resp === 'undefined') {
        throw Error(`Unknown endpoint ${endpoint}`);
    }
    return resp;
});

mockedFetchParticipants.mockImplementation(async (endpoint: string, apiSource: apiSource): Promise<iParticipant[]> => {
    const resp = {
        'tournaments/1/participants.json': tourney1Participants,
        'tournaments/2/participants.json': tourney2Participants
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
            id: tourneyNum,
            tournament_type: 'double elimination',
            name: `Tournament ${tourneyNum}`,
            rankedParticipants: [],
            state: 'complete',
            created_at: '2023-11-01',
            updated_at: '2023-11-01',
            started_at: '2023-11-01',
            completed_at: '2023-11-01',
            participants_count: 4,
            game_name: '8-ball',
            url: '1'
        }
    };
}

// mockedCleanName.mockImplementation((name: string) => {
//     return name;
// });

test('getMatches is mocked properly.', async () => {
    const matches = await fetchMatches('tournaments/1/matches.json', 'dynamo');
    expect(matches).toEqual(tourney1Matches);
});

test('getParticipants is mocked properly.', async () => {
    const participants = await fetchParticipants('tournaments/1/participants.json', 'dynamo');
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
    expect(statStore.podiumFinishes).toEqual(testPodiumFinishes);
    expect(statStore.h2h).toEqual(twoTourneyH2H);
});

test('Assure rankedParticipants ranks players properly.', async () => {
    let statStore = emptyStatStore();
    statStore = await addTourneyToStatStore(tourneyFactory(1), statStore, 'dynamo');
    statStore = await addTourneyToStatStore(tourneyFactory(2), statStore, 'dynamo');
    const expectedTourney1: iTournament = tourneyFactory(1);
    expectedTourney1.tournament.rankedParticipants = {};
    expectedTourney1.tournament.rankedParticipants[1] = ['Player 4'];
    expectedTourney1.tournament.rankedParticipants[2] = ['Player 1'];
    expectedTourney1.tournament.rankedParticipants[3] = ['Player 2', 'Player 3'];

    expect(statStore.tourneys[0]).toEqual(expectedTourney1);

    const expectedTourney2: iTournament = tourneyFactory(2);
    expectedTourney2.tournament.rankedParticipants = {};
    expectedTourney2.tournament.rankedParticipants[1] = ['Player 3'];
    expectedTourney2.tournament.rankedParticipants[2] = ['Player 4'];
    expectedTourney2.tournament.rankedParticipants[3] = ['Player 1', 'Player 2'];

    expect(statStore.tourneys[1]).toEqual(expectedTourney2);

});