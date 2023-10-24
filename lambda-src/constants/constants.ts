import { firstPlace, podiumPlaces, secondPlace, thirdPlace } from "../lib/types";

export const FIRST_PLACE: firstPlace = 'First Place Finishes';
export const SECOND_PLACE: secondPlace = 'Second Place Finishes';
export const THIRD_PLACE: thirdPlace = 'Third Place Finishes';

export const podiumLookup: { [key: number]: podiumPlaces } = {
    1: FIRST_PLACE,
    2: SECOND_PLACE,
    3: THIRD_PLACE
};

export const SUBDOMAIN = 'b71fc01980b13ee66eab1849';
export const DYNAMO = 'dynamo';
export const CHALLONGE = 'challonge';

let isTesting = false;

export const setIsTesting = (input: boolean) => {
    isTesting = input;
}

export const getIsTesting = () => {
    return isTesting;
}
