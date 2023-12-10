import React, { ReactNode, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { tourneyGetter } from '../util/fetchers';
import { iTournament } from '../../../../src-shared/types';

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

const TournamentsBlock: React.FC<{ tourneys: iTournament[] }> = (props) => {
    console.log(props.tourneys);
    const arr = props.tourneys.map((el: iTournament) => {
        console.log(el);
        return (
            <Container key={el.tournament.id}>
                {el.tournament.name}
            </Container>
        )
    });
    return <Container>
        {arr}
    </Container>
};

export default TournamentsPage;