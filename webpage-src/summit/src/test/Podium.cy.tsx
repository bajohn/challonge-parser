import React from 'react'
import { PodiumFinishes } from '../Podium';
import { podiumGetter } from '../util/fetchers';
import { rootUrl } from '../util/constants';

before(() => {
    // root-level hook
    // runs once before all tests


})

describe('<PodiumFinishes />', () => {


    it('renders', () => {



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



        // cy.intercept({
        //     method: 'GET',
        //     url: hardUrl
        // }, (req) => {
        //     console.log('hi')
        //     return mockResp
        // }).as('getPodiums')

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
                cy.get('tr td:first').should('have.text','playerA');
            })

    })
});

