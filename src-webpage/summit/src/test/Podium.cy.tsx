import React from 'react'
import { PodiumFinishes } from '../Podium';
import { podiumGetter } from '../util/fetchers';
import { rootUrl } from '../util/constants';

// before(() => {
// });

describe('<PodiumFinishes />', () => {
    it('displays one player', () => {

        const hardUrl = 'https://xx3ptt5y85.execute-api.us-west-2.amazonaws.com/summit-stage/podium-finishes';
        const mockResp = {
            statusCode: 200,
            body: {
                "data": {
                    "First Place Finishes": {
                        "playerA": 1
                    },
                    "Second Place Finishes": {
                        "playerA": 1
                    },
                    "Third Place Finishes": {
                        "playerA": 1
                    }
                }
            }
        };

        cy.intercept(hardUrl, mockResp
        ).as('getPodiums')
            .then(async () => {
                let podiums = {}
                const setPodiums = (updated: any) => { podiums = updated };
                await podiumGetter(setPodiums)
                return podiums
            })
            .then((podiums) => {
                console.log(podiums)
                cy.mount(<PodiumFinishes podiums={podiums} />)
                cy.get('tr td').each((el, idx) => {
                    if (idx === 0) {
                        cy.wrap(el).should('have.text', 'playerA');
                    }
                    else if (idx === 1) {
                        cy.wrap(el).should('have.text', '🥇🥈🥉');
                    }
                })
            });

    });

    it('displays three players', () => {

        const hardUrl = 'https://xx3ptt5y85.execute-api.us-west-2.amazonaws.com/summit-stage/podium-finishes';
        const mockResp = {
            statusCode: 200,
            body: {
                "data": {
                    "First Place Finishes": {
                        "playerA": 3,
                        "playerC": 2,
                        "playerB": 1,
                    },
                    "Second Place Finishes": {
                        "playerC": 1,
                        "playerA": 2,
                        "playerB": 1,

                    },
                    "Third Place Finishes": {
                        "playerC": 1,                      
                        "playerA": 2,
                        "playerB": 2
                    }
                }
            }
        };

        cy.intercept(hardUrl, mockResp
        ).as('getPodiums')
            .then(async () => {
                let podiums = {}
                const setPodiums = (updated: any) => { podiums = updated };
                await podiumGetter(setPodiums)
                return podiums
            })
            .then((podiums) => {
                console.log(podiums)
                cy.mount(<PodiumFinishes podiums={podiums} />)
                cy.get('tr td').each((el, idx) => {
                    if (idx === 0) {
                        cy.wrap(el).should('have.text', 'playerA');
                    }
                    else if (idx === 1) {
                        cy.wrap(el).should('have.text', '🥇🥇🥇🥈🥈🥉🥉');
                    }
                    else if (idx === 2) {
                        cy.wrap(el).should('have.text', 'playerC');
                    }
                    else if (idx === 3) {
                        cy.wrap(el).should('have.text', '🥇🥇🥈🥉');
                    }
                    else if (idx === 4) {
                        cy.wrap(el).should('have.text', 'playerB');
                    }
                    else if (idx === 5) {
                        cy.wrap(el).should('have.text', '🥇🥈🥉🥉');
                    }
                })
            });

    });
});

