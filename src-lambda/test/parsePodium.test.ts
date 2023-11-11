import { describe, expect, test, jest } from '@jest/globals';

import { apiSource, iStatStore, iTournament, iMatch, iParticipant } from "../../src-shared/types";
import { fetchMatches, fetchParticipants } from "../lib/doFetch";

jest.mock('../lib/doFetch'); // magic 
const mockedFetchMatches = jest.mocked(fetchMatches);
const mockedFetchParticipants = jest.mocked(fetchParticipants);

// Small mock tournament
// 4 Players
// Outcome:
// 
// Match1: 1v2 -> 1 wins
// Match2: 3v4 -> 4 wins
// Match3: 1v4 -> 4 wins
// 
//


const mockMatchResp: iMatch[] = [
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



const mockParticipantResp: iParticipant[] = [
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
]

mockedFetchMatches.mockImplementation(async (endpoint: string, apiSource: apiSource): Promise<iMatch[]> => {
    return mockMatchResp;
});

mockedFetchParticipants.mockImplementation(async (endpoint: string, apiSource: apiSource): Promise<iParticipant[]> => {
    return mockParticipantResp;
});
test('getMatches is mocked properly.', async () => {
    const matches = await fetchMatches('tourney1_matches', 'dynamo');
    expect(matches).toEqual(mockMatchResp);
});

test('getParticipants is mocked properly.', async () => {
    const participants = await fetchParticipants('tourney1_participants', 'dynamo');
    expect(participants).toEqual(mockParticipantResp);
});