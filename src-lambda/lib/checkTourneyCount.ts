import { CHALLONGE_ENDPOINT } from "../../src-shared/constants";
import { fetchTournies } from "./challongeFetch";
import { apiSource, iTournament } from "../../src-shared/types";

export const checkTourneyCount = async (source: apiSource) => {
  const tourneys = await getTourneys(source);
  const tourneyCount = tourneys.reduce((lv: number, cv: iTournament) => {
    if (cv.tournament.state === "complete") {
      lv += 1;
    }
    return lv;
  }, 0);
  console.log(`Tournament count check, ${source}: ${tourneyCount}`);
  return tourneyCount;
};

const getTourneys = async (source: apiSource) => {
  const tourneys = await fetchTournies(CHALLONGE_ENDPOINT, source);
  return tourneys.reduce((lv, cv) => {
    if (cv.tournament.state === "complete") {
      lv.push(cv);
    }
    return lv;
  }, []);
};
