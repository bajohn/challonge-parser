import { describe, expect, test, jest } from '@jest/globals';

import { cleanName } from "../../constants/cleanName";



// test("cleanName disambiguates when a name has a clean name contained in it (here, Katy)", async () => {
//     const resp = cleanName('Katya')
//     expect(resp).toEqual('Katya');
// });


test("cleanName works for a typical set of names from a tournament", async () => {
    const nameLookup = {
        'Aqeel ✌️ x': 'Aqeel',
        'Sirine 🍄🐠🦋 x': 'Sirine',
        'Robin 🦢 x': 'Robin',
        'Alec 🦂 x': 'Alec',
        'Adel 👁️ x': 'Adel',
        'Darren 🐢 x': 'Darren',
        'Adam 🦜 x': 'Adam',
        'M2 🐺 x': 'Martin',
        'Chris 🩴 x': 'Chris',
        'Josh 🐦‍⬛ x': 'Joshua',
        'Mohammed 🐥 x': 'Mohammed',
        'Brendan 🦭 x': 'Brendan',
        'Katy 🫧🧚🏻‍♀️🤸🏻‍♀️🍄🦋🌲🪷🌚🌈 x': 'Katy',
        'Luis 🦖 x': 'Luis',
        'Katya 🤠 x': 'Katya',
        'Abdul 😎 x': 'Abdul',
        'Campbell 🦈 x': 'Campbell',
        'newguy456': 'newguy456'
    } as {[key: string]: string};
    for(const name of Object.keys(nameLookup)) {
        expect(cleanName(name)).toEqual(nameLookup[name]);
    }
});

