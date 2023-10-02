exports.cleanName = (name) => {
    const lookup = {
        Campbell: [
            'Campbell 🤠 x',
            'Campbell 🧑‍⚖️🐟 x',
            'Campbell x',
            'Campbell🦈',
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
        Brendan: [
            'Brendan 🦭 x',
            'Brendan x',
            'Brendan 👼 x',
            'Brendan 🦭 x',
            'Brendan 🦭 x',
            'Brendan 🦭',
            'Mr. Brendan 🦭💍 x'
        ],
        Luis: [
            'Luis x',
            'Luis 🦖 x',
            'Luis Vuitton 🦖 x',
        ],
        Sean: [
            'Sean 🖕 x',
            'Sean 👍 x',
            'Sean 🎼 x'
        ],
        Woody: [
            'Woody 💧x',
        ],
        Adam: [
            'Adam 🦜 x',
            'Adam 🦤 x',
            'Adam 🍩 x',
            'Adam 🦜 x',
            'Adam ⚾️ x'

        ],
        Darren: [
            'Darren x 🐢',
            'Darren 🐢 x'
        ],
        Lily: [
            'Medusa 🧟‍♀️ x',
            'Lily x',
        ],
        Joshua: [
            'Josh',
            'Josh 🤡 x',

        ],
        Martin: [
            'Martini 🧜‍♂️🍸 (with a twist)',
            'Martin “The Brown Recluse” 🕷️',
            'M2 🐺'
        ],
        Marty: [
            'Marty 💚 x'
        ],
        'Big Chris': [
            'OG Chris 😎'
        ],
        Spencer: [
            'Eightball Break Spence 🕊️ x',
            'Herrerasaurus 🎧 x',
        ],
        Katy: [
            'K86 🫧🧚🏻‍♀️🤸🏻‍♀️🍄🦋🌲🪷🌚🌈 x',
            'K86'
        ],
        Ken: [
            'Ken 💀 x',
            'Ken 💀x'
        ],
        Bella: [
            'Bella 🧜‍♀️ x'
        ],
        Sirine: [
            'Sirine 🐠🦋 x'
        ],
        James: [
        ],
        Chris: [
            'Chris 🩴 x'
        ]

    }

    for (const key of Object.keys(lookup)) {
        // First priority - 
        // Matches element of subarray - hardcoded replacement
        if (lookup[key].indexOf(name) !== -1) {
            return key;
        }
        // Second priority
        // Clean name is substring of raw name
        if (name.indexOf(key) > -1) {
            return key
        }
        // Third priority
        // Element of subarray is substring of raw name
        for (const subel of lookup[key]) {
            if (name.indexOf(subel) > -1) {
                return key
            }
        }
    }
    return name;
};

exports.findCleanName = (playerId, participants) => {
    for (const el of participants) {
        const participant = el['participant'];
        if (participant['id'] === playerId) {
            return exports.cleanName(participant['name']);
        }
    }
    throw (`Error - name not found for ID: ${participant['id']}`);
};