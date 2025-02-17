import { CHALLONGE, CHALLONGE_ENDPOINT, DYNAMO, UPDATE_COMPLETE } from "../src-shared/constants";
import { iTournament, iTournamentData } from "../src-shared/types";
import { router } from "./entrypoints/api-entry";
import { updaterHandler } from "./entrypoints/invoked-dynamo-updater";
import { fetchTournies } from "./lib/challongeFetch";
import { checkTourneyCount } from "./lib/checkTourneyCount";
import { dyGetAllPlayers, dyGetAllTourneys, dyGetMetaField, dyGetPodiumFinishes, dyPutMetaField } from "./lib/dynamo";
import { updateDynamo } from "./lib/updateDynamo";


// setIsTesting(true);
// handler();
// const rootUrl = 'https://xx3ptt5y85.execute-api.us-west-2.amazonaws.com/summit-stage/';
const main = async () => {
    console.log('hi there');

    // const resp = await getPodiumFinishes();
    // const players = await getAllPlayers();
    const resp = await updateDynamo(true);
    //const dynamoCount = await checkTourneyCount(DYNAMO);
    //const challongeCount = await checkTourneyCount(CHALLONGE);
    // const rawTourneys = await fetchTournies(CHALLONGE_ENDPOINT, DYNAMO);
    // const tourneys = await dyGetAllTourneys();

    // const resp = tourneys.tournaments.reduce((lv: number, cv: iTournamentData) => {
    //     if (cv.state === 'complete') {
    //         lv += 1;
    //     }
    //     return lv;
    // }, 0);

    // console.log(JSON.stringify(rawTourneys));
    // const resp = rawTourneys.map(el => {
    //     return {
    //         name: el.tournament.name,
    //         state: el.tournament.state
    //     }
    // });


    console.log({
        resp
        //challongeCount
    });
}

main();
