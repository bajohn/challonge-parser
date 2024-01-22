import React, { ChangeEventHandler, ReactNode, useEffect, useState } from "react";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import { getTourney, tourneyGetter, updateTourney } from '../util/fetchers';
import { iTournament } from '../../../../src-shared/types';
import Card from 'react-bootstrap/Card';

const TournamentsPage: React.FC<{ isAdminPage: boolean }> = (props) => {
    const [tourneys, setTourneys] = useState([] as iTournament[]);

    useEffect(() => {
        tourneyGetter(setTourneys);
    }, []);

    return (<Container>
        <h1>
            Past Tournaments
        </h1>

        <TournamentsTable tourneys={tourneys} isAdminPage={props.isAdminPage} />

    </Container>)

};

const pascalCase = (str: string) => str.split(' ').map(el => el.substring(0, 1).toUpperCase() + el.substring(1).toLowerCase()).join(' ');

const TournamentsTable: React.FC<{
    tourneys: iTournament[],
    isAdminPage: boolean
}> = (props) => {
    props.tourneys.sort((a, b) => {
        if (a.tournament.completed_at > b.tournament.completed_at) {
            return -1;
        } else {
            return 1;
        }
    });



    const arr = props.tourneys.map((el: iTournament) => TournamentRow(
        props.isAdminPage,
        el
    ));
    return <Container>
        {arr}
    </Container>
};

const TournamentRow = (isAdminPage: boolean, el: iTournament) => {
    const [READY, IN_PROG] = [1, 2];
    const [textInput, setTextInput] = useState("");
    const [updateState, setUpdateState] = useState(READY);

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

    const AdminVideoEntry = (el: iTournament) => {
        const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTextInput(event.target.value);
        }

        const onTextSubmit = async () => {
            setUpdateState(IN_PROG);
            await updateTourney(el.tournament.id, { videoLink: textInput })
            const updated = await getTourney(el.tournament.id);
            el.tournament = updated;
            setUpdateState(READY);
        }
        return <Container>
            {
                el.tournament.videoLink ?
                    <Container>
                        Current Link:
                        <a href={el.tournament.videoLink}>
                            {el.tournament.videoLink}
                        </a>
                    </Container>
                    : <Container>
                        No link available
                    </Container>

            }
            Enter stream link:

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Link to YouTube"
                    aria-label="Link to YouTube"
                    onChange={onTextChange}
                />
                {/* <InputGroup.Text
                        id="basic-addon2"
                        onChange={onTextChange}
                    >blahblah</InputGroup.Text> */}
            </InputGroup>



            {
                updateState === READY ?
                    <Button onClick={onTextSubmit}>
                        Submit
                    </Button>
                    :
                    <Container>
                        Updating...
                    </Container>
            }

        </Container>
    };

    const VideoLink = (el: iTournament) => {
        if (el.tournament.videoLink) {
            return <Container>
                <a target="_blank" href={el.tournament.videoLink}>
                    {el.tournament.videoLink}
                </a>
            </Container>
        } else {
            return <Container>
                No stream link available
            </Container>
        }

    };

    return (
        <Container key={el.tournament.id}>
            <Card>
                <Card.Header as="h5">   {el.tournament.name}  </Card.Header>
                <Card.Body>
                    {/* <Card.Title></Card.Title>
                    <Card.Text> */}
                    {topThree.map((t3el, idx) => {
                        return <Container key={idx}>
                            {t3el}
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
                        <a target="_blank" href={challongeUrl(el.tournament.url)}>  Challonge Bracket </a>
                    </Container>

                    {isAdminPage ?
                        AdminVideoEntry(el)
                        :
                        VideoLink(el)
                    }

                    {/* </Card.Text> */}
                </Card.Body>
            </Card>

        </Container>
    )
}

export default TournamentsPage;