import React, { ReactNode, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { tourneyGetter } from '../util/fetchers';
import { iTournament } from '../../../../src-shared/types';
import Card from 'react-bootstrap/Card';

function TournamentsPage(props: any) {
    const [tourneys, setTourneys] = useState([] as iTournament[]);

    useEffect(() => {
        tourneyGetter(setTourneys);
    }, []);

    return (<Container>
        <h1>
            Past Tournaments
        </h1>

        <TournamentsBlock tourneys={tourneys} />

    </Container>)

};

const pascalCase = (str: string) => str.split(' ').map(el => el.substring(0, 1).toUpperCase() + el.substring(1).toLowerCase()).join(' ');

const TournamentsBlock: React.FC<{ tourneys: iTournament[] }> = (props) => {
    console.log(props.tourneys);
    props.tourneys.sort((a, b) => {
        if (a.tournament.completed_at > b.tournament.completed_at) {
            return -1;
        } else {
            return 1;
        }
    });



    const arr = props.tourneys.map((el: iTournament) => {
        console.log(el);
        const challongeUrl = (suffix: string) => `https://challonge.com/${suffix}`;
        const rankedParticipants = el.tournament.rankedParticipants;

        const topThree: string[] = [];

        if (typeof rankedParticipants !== 'undefined') {
            const medal: { [index: number]: string } = {
                1: '🥇',
                2: '🥈',
                3: '🥉',
            };
            [1, 2, 3].reduce((lv, rankIdx) => {
                if (rankIdx in rankedParticipants) {
                    const toPush = medal[rankIdx] + rankedParticipants[rankIdx].join(', ');
                    lv.push(toPush)
                }
                return lv;
            }, topThree)
        }

        return (
            <Container key={el.tournament.id}>
                <Card>
                    <Card.Header as="h5">   {el.tournament.name}  </Card.Header>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                            {topThree.map(el => {
                                return <Container>
                                    {el}
                                </Container>
                            })}

                            <Container>
                                Date: {el.tournament.started_at.substring(0, 10)}
                            </Container>
                            <Container>
                                Participants: {el.tournament.participants_count}
                            </Container>
                            <Container>
                                Format: {pascalCase(el.tournament.tournament_type)}
                            </Container>
                            <Container>
                                <a href={challongeUrl(el.tournament.url)}>  Challonge Bracket </a>
                            </Container>
                        </Card.Text>
                    </Card.Body>
                </Card>

            </Container>
        )
    });
    return <Container>
        {arr}
    </Container>
};

export default TournamentsPage;