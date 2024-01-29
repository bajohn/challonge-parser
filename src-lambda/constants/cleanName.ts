import { iParticipant } from "../../src-shared/types";

export const cleanName = (name: string) => {
    const lookup: { [key: string]: string[] } = {
        Abdul: [],
        Adam: [
            'Adam 🦜 x',
            'Adam 🦤 x',
            'Adam 🍩 x',
            'Adam 🦜 x',
            'Adam ⚾️ x'

        ],
        Adel: [
            'El Maestro 👁️ x',
            'Adel 👁 x',
            'Adel 👁️ x',
            'Adel 👁️ x',
            'Adel x',
            'Adel 👨‍🍳 x',
            'Adel 👁️'
        ],
        Alec: [],
        Alex: [],
        Andrew: [
            'Andrew 🎱 x'
        ],
        Andy: [],
        Antonio: [],
        Aqeel: [],
        Ari: ['Ari 🐙 x'],
        Aryan: ['Aryan x'],
        Austin: ['Austin x', 'Austin 🍑 x'],
        Ben: ['Ben x'],
        Tom: [
            'Big ChaTomgus 🌴 x'
        ],
        'Big Chris': [
            'OG Chris 😎'
        ],
        Bella: [
            'Bella 🧜‍♀️ x'
        ],
        Bill: ['Bill'],
        Brett: ['Brett x'],
        Blake: [],
        Brandon: ['Brandon 💅 x'],
        Brendan: [
            'Brendan 🦭 x',
            'Brendan x',
            'Brendan 👼 x',
            'Brendan 🦭 x',
            'Brendan 🦭 x',
            'Brendan 🦭',
            'Mr. Brendan 🦭💍 x'
        ],

        Campbell: [
            'Campbell 🤠 x',
            'Campbell 🧑‍⚖️🐟 x',
            'Campbell x',
            'Campbell🦈',
        ],
        Carter: [
            'Carter x'
        ],
        Chahrazef: [],
        Charlie: [],
        Cho: [
            'Cho x',
            'Cho 👸🏻'
        ],
        'Chris M': [
            'Chris 🩴 x',
            'Chris'
        ],
        'Chris H': [
            'Chris H x'
        ],
        Claire: [],
        Darren: [
            'Darren x 🐢',
            'Darren 🐢 x'
        ],
        David: [],
        Derek: [
            'Derek 🪤 x	'
        ],
        Edward: [],
        Enrique: [],
        Faisal: [
            'Faisal',
            'Faysal'
        ],
        Graydon: [
            'Graydon 😭 x'
        ],
        Greg: [
            'Greg 🏒 x'
        ],
        Idir: [],
        James: [
        ],
        Jackie: [],
        Jake: [],
        Jeff: [],
        Joe: [
            'Joe 🍳 x'
        ],
        Joshua: [
            'Josh',
            'Josh 🤡 x',
        ],
        JT: [],
        Katy: [
            'K86 🫧🧚🏻‍♀️🤸🏻‍♀️🍄🦋🌲🪷🌚🌈 x',
            'K86'
        ],
        Katya: [
            'Katya 🤠 x'
        ],
        Ken: [
            'Ken 💀 x',
            'Ken 💀x'
        ],
        Lauren: [
            'Lauren x'
        ],
        Lily: [
            'Medusa 🧟‍♀️ x',
            'Lily x',
            'Lillies 🫘'
        ],
        Lisa: [],
        Luis: [
            'Luis x',
            'Luis 🦖 x',
            'Luis Vuitton 🦖 x',
        ],


        Marcus: [],
        Mariel: [],
        Martin: [
            'Martini 🧜‍♂️🍸 (with a twist)',
            'Martin “The Brown Recluse” 🕷️',
            'El Lobo 🐺',
            'M² Prime 🤖 beep boop',
            'M2'
        ],
        Marty: [
            'Marty 💚 x'
        ],
        Matthew: [
            'Matthew x'
        ],
        Maya: [
            'Maya 🍉'
        ],
        Mike: [
            'Mike 👽 x'
        ],
        Mohammed: [
            'Mo 🐥 x',
            'Mo x',
            'Mohammad 🐥 x',
        ],
        Philo: [],
        Robin: [],
        Ronnie: [],
        Ryan: [],
        Said: [],
        Sean: [
            'Sean 🖕 x',
            'Sean 👍 x',
            'Sean 🎼 x',
            'S69',
        ],
        Sirine: [
            'Sirine 🐠🦋 x'
        ],

        Spencer: [
            'Herrerasaurus',
            'Spence'
        ],
        Rachelle: [
            'Rachelle 📢 x'
        ],
        Ray: [
            'Ray 🐍 x'
        ],
        Sup: [
            'Sup 🐐 x'
        ],
        Tef: [
            'Teff 😈'
        ],
        Vic: [
            'Vic 🥴 x'
        ],
        Will: [
            'Will 🤠 x'
        ],
        Woody: [
            'Woody 💧x',
        ],
        Xavier: [
            'Xavier 😋 x'
        ],
        Ykaalo: [
            'Ykaalo 🦘 x'
        ]
    };

    // default: clean name is the raw name
    const rankTracker = {
        cleanName: name,
        strength: 0
    };

    const updateRank = (newName: string, newStrength: number) => {
        if (newStrength > rankTracker.strength) {
            rankTracker.cleanName = newName;
            rankTracker.strength = newStrength;
        } else if (newStrength === rankTracker.strength) {
            // This shouldn't happen, but logging this case
            console.warn(`Warning - unable to disambiguate mapping input "${name}" to cleaned name "${newName}" or "${rankTracker.cleanName}}"`);
        }
    };

    for (const cleanName of Object.keys(lookup)) {
        // In order of priority:
        // Matches key exactly
        if (cleanName === name) {
            updateRank(cleanName, 10);
        }

        // Matches element of subarray - hardcoded replacement
        if (lookup[cleanName].indexOf(name) !== -1) {
            updateRank(cleanName, 9);
        }

        // Clean name is substring of raw name
        if (name.indexOf(cleanName) > -1) {
            updateRank(cleanName, 8);
        }

        // Element of subarray is substring of raw name
        for (const subel of lookup[cleanName]) {
            if (name.indexOf(subel) > -1) {
                updateRank(cleanName, 7);
            }
        }

        // Clean name is substring of raw name - case insensitive
        if (name.toLowerCase().indexOf(cleanName.toLowerCase()) > -1) {
            updateRank(cleanName, 6);
        }

        // Element of subarray is substring of raw name = case insensitive
        for (const subel of lookup[cleanName]) {
            if (name.toLowerCase().indexOf(subel.toLowerCase()) > -1) {
                updateRank(cleanName, 5);
            }
        }
    }
    return rankTracker.cleanName;
};

export const findCleanName = (playerId: number, participants: iParticipant[]) => {
    for (const el of participants) {
        const participant = el['participant'];
        if (participant['id'] === playerId) {
            return exports.cleanName(participant['name']);
        }
    }
    throw (`Error - name not found for ID: ${playerId}`);
};