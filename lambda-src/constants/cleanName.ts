exports.cleanName = (name: string) => {
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
        Andy: [],
        Antonio: [],
        Aqeel: [],
        Ari: ['Ari 🐙 x'],
        Aryan: ['Aryan x'],
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
        Chahrazef: [],
        Charlie: [],
        Cho: [
            'Cho x',
            'Cho 👸🏻'
        ],
        Chris: [
            'Chris 🩴 x'
        ],
        Claire: [],
        Darren: [
            'Darren x 🐢',
            'Darren 🐢 x'
        ],
        David: [],
        Edward: [],
        Enrique: [],
        Faisal: [
            'Faisal',
            'Faysal'
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
        Ken: [
            'Ken 💀 x',
            'Ken 💀x'
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
            'M2 🐺',
            'El Lobo 🐺'
        ],
        Marty: [
            'Marty 💚 x'
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
        Woody: [
            'Woody 💧x',
        ],
    };

    // TODO - this priority isn't quite right
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

exports.findCleanName = (playerId: number, participants: iParticipant[]) => {
    for (const el of participants) {
        const participant = el['participant'];
        if (participant['id'] === playerId) {
            return exports.cleanName(participant['name']);
        }
    }
    throw (`Error - name not found for ID: ${playerId}`);
};