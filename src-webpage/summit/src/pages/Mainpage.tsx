import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { PodiumFinishes } from '../Podium';
import { playerGetter, podiumGetter } from '../util/fetchers';
import TournamentsPage from './Tournamentspage';
const MIN_GAMES = 10;
const Mainpage = () => {
    const [players, setPlayers] = useState([]);
    const [podiums, setPodiums] = useState({});
    useEffect(() => {
        playerGetter(setPlayers);
        podiumGetter(setPodiums);
    }, []);

    return (
        <Container className="App" data-bs-theme="dark">
            <h1>
                Summit Wednesday Night Tournaments
            </h1>
            <Tabs>
                <Tab eventKey="ranking" title="Ranking">
                    <h2>
                        Podium Finishes
                    </h2>
                    <PodiumFinishes podiums={podiums}>

                    </PodiumFinishes>
                    <h2>
                        Ranked Players
                    </h2>
                    <div className="subheader-italic">
                        Minimum {MIN_GAMES} games played
                    </div>
                    <RankedPlayers players={players}>

                    </RankedPlayers>
                    <h2>
                        Unranked Players
                    </h2>
                    <UnrankedPlayers players={players}>

                    </UnrankedPlayers>
                </Tab>
                <Tab eventKey="tournaments" title="Tournaments">
                    <TournamentsPage isAdminPage={false} />
                </Tab>
            </Tabs>
        </Container>



    );
}



const RankedPlayers = (props: any) => {
    const rankedPlayers = props.players.reduce((lv: any[], cv: any) => {
        if (cv.w + cv.l >= MIN_GAMES) {
            lv.push(cv);
        }
        return lv;
    }, [])

    return (<PlayerTable
        players={rankedPlayers}
        showRank={true}
    >
    </PlayerTable>)
}

const UnrankedPlayers = (props: any) => {
    const unRankedPlayers = props.players.reduce((lv: any[], cv: any) => {
        if (cv.w + cv.l < MIN_GAMES) {
            lv.push(cv);
        }
        return lv;
    }, []);


    return (<PlayerTable
        players={unRankedPlayers}
        showRank={false}
    >

    </PlayerTable>)
}

const PlayerTable = (props: any) => {
    let counter = 0;
    const showRank = props.showRank;
    return (<Table striped bordered hover>

        <thead>
            <tr>
                {showRank ? <th scope="col"> Rank</th> : null}
                <th scope="col">Player</th>
                <th scope="col">Wins</th>
                <th scope="col">Losses</th>
                <th scope="col">Win %</th>
            </tr>
        </thead>
        <tbody>
            {props.players.map((player: any) => {
                counter += 1;
                return (
                    <tr key={player.playerName}>
                        {showRank ? <th > {counter}  </th> : null}
                        <th scope="row"> {player.playerName} </th>
                        <td> {player.w}</td>
                        <td> {player.l}</td>
                        <td> {player.pctPretty}</td>
                    </tr>

                )
            })}
        </tbody>
    </Table>);
}



export default Mainpage;
