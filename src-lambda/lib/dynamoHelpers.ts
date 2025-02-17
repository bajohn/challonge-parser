import { iMatch, iMatchMin, iParticipant, iTournament } from "../../src-shared/types";

// Store only needed fields in Dynamo
export const getMinimal = (endpoint: string, resp: any[]) => {
    if (endpoint.indexOf('matches') > -1) {
        return resp.map((el: iMatch): iMatchMin => {
            const match = el.match;
            return {
                match: {
                    player1_id: match.player1_id,
                    player2_id: match.player2_id,
                    winner_id: match.winner_id
                }

            }
        });
    }
    else if (endpoint.indexOf('participants') > -1) {
        return resp.map((el: iParticipant) => {
            const participant = el.participant;
            return {
                participant: {
                    id: participant.id,
                    final_rank: participant.final_rank,
                    name: participant.name
                }
            }
        });
    }
    else if (endpoint.indexOf('tournament') > -1) {
        return resp.map((el: iTournament) => {
            const tournament = el.tournament;
            return {
                tournament: {
                    name: tournament.name,
                    id: tournament.id,
                    url: tournament.url,
                    tournament_type: tournament.tournament_type,
                    state: tournament.state,
                    created_at: tournament.created_at,
                    updated_at: tournament.updated_at,
                    started_at: tournament.started_at,
                    completed_at: tournament.completed_at,
                    participants_count: tournament.participants_count,
                    game_name: tournament.game_name
                }
            }
        });
    }
    return resp;
};