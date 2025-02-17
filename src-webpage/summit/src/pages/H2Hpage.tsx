import React, { ChangeEventHandler, ReactNode, useEffect, useState } from "react";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import { getTourney, h2hGetter, tourneyGetter, updateTourney } from '../util/fetchers';
import { iH2h, iTournament, iTournamentData } from '../../../../src-shared/types';
import Card from 'react-bootstrap/Card';

const H2HPage: React.FC<{ isAdminPage: boolean }> = (props) => {
    const [h2h, setH2h] = useState({} as iH2h[]);

    useEffect(() => {
        h2hGetter(setH2h);
    }, []);
    console.log(h2h);
    return (<Container>
        <h1>
            Past Tournaments
        </h1>
    </Container>)
};

export default H2HPage;