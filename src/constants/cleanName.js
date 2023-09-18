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
        ],
        Brendan: [
            'Brendan 🦭 x',
            'Brendan x',
            'Brendan 👼 x',
            'Brendan 🦭 x',
            'Brendan 🦭 x',
            'Brendan 🦭',
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
        ],
        Spencer: [
            'Eightball Break Spence 🕊️ x',
            'Herrerasaurus 🎧 x',
        ],
        Katy: [
            'K86 🫧🧚🏻‍♀️🤸🏻‍♀️🍄🦋🌲🪷🌚🌈 x',
        ],
        Bella :[
            'Bella 🧜‍♀️ x'
        ],
        Sirine: [
            'Sirine 🐠🦋 x'
        ]
    }

    for (const key of Object.keys(lookup)) {
        if (lookup[key].indexOf(name) !== -1){
            return key;
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