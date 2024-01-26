import React, { ChangeEventHandler, ReactNode, useEffect, useState } from "react";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import { getTourney, tourneyGetter, updateTourney } from '../util/fetchers';
import { iTournament, iTournamentData } from '../../../../src-shared/types';
import Card from 'react-bootstrap/Card';

const TournamentsPage: React.FC<{ isAdminPage: boolean }> = (props) => {
    const [tourneys, setTourneys] = useState([] as iTournamentData[]);

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
    tourneys: iTournamentData[],
    isAdminPage: boolean
}> = (props) => {
    props.tourneys.sort((a, b) => {
        if (a.completed_at > b.completed_at) {
            return -1;
        } else {
            return 1;
        }
    });



    const arr = props.tourneys.map((el: iTournamentData) => TournamentRow(
        props.isAdminPage,
        el
    ));
    return <Container>
        {arr}
    </Container>
};

const TournamentRow = (isAdminPage: boolean, el: iTournamentData) => {
    const [READY, IN_PROG] = [1, 2];
    const [textInput, setTextInput] = useState("");
    const [updateState, setUpdateState] = useState(READY);

    const challongeUrl = (suffix: string) => `https://challonge.com/${suffix}`;
    const rankedParticipants = el.rankedParticipants;

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

    const AdminVideoEntry = (el: iTournamentData) => {
        const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTextInput(event.target.value);
        }

        const onTextSubmit = async () => {
            setUpdateState(IN_PROG);
            await updateTourney(el.id, { videoLink: textInput })
            const updated = await getTourney(el.id);
            el = updated;
            setUpdateState(READY);
            // TODO - be nice to clean out the input text after submission.
            // setTextInput('');
        }
        return <Container>
            {
                el.videoLink ?
                    <Container>
                        Current Link:
                        <a href={el.videoLink}>
                            {el.videoLink}
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

    const VideoLink = (el: iTournamentData) => {
        if (el.videoLink) {
            return <Container>
                <a target="_blank" href={el.videoLink}>
                    {el.videoLink}
                </a>
            </Container>
        } else {
            return <Container>
                No stream link available
            </Container>
        }

    };

    return (
        <Container key={el.id}>
            <Card>
                <Card.Header as="h5">   {el.name}  </Card.Header>
                <Card.Body>
                    {/* <Card.Title></Card.Title>
                    <Card.Text> */}
                    {topThree.map((t3el, idx) => {
                        return <Container key={idx}>
                            {t3el}
                        </Container>
                    })}

                    <Container>
                        Date: {el.started_at.substring(0, 10)}
                    </Container>
                    <Container>
                        Participants: {el.participants_count}
                    </Container>
                    <Container>
                        Format: {pascalCase(el.tournament_type)}
                    </Container>
                    <Container>
                        <a target="_blank" href={challongeUrl(el.url)}>  Challonge Bracket </a>
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