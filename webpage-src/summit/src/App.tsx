import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import './App.css';
import { rootUrl } from './util/constants';
const MIN_GAMES = 2;
function App() {
  const [players, setPlayers] = useState([]);
  const [podiums, setPodiums] = useState([]);
  useEffect(() => {
    playerGetter(setPlayers);
  }, []);

  return (
    <Container className="App" data-bs-theme="dark">
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
    </Container>

  );
}



function RankedPlayers(props: any) {
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

function UnrankedPlayers(props: any) {
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

function PlayerTable(props: any) {
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

const playerGetter = async (setPlayers: any) => {

  const resp = await fetch(`${rootUrl}get-players`)
  const jsonResp = await resp.json();
  const players = jsonResp.players;
  players.map((el: any) => {
    const num = el['w'] / (el['w'] + el['l']) * 100;
    el['pct'] = num;
    el['pctPretty'] = Number(num.toLocaleString('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }));
    return el;
  });
  players.sort((a: any, b: any) => {
    if (a['pct'] === b['pct']) {
      if (a['w'] === b['w']) {
        return a['l'] < b['l'] ? -1 : 1
      }
      return a['w'] > b['w'] ? -1 : 1
    }
    return a['pct'] > b['pct'] ? -1 : 1;
  });
  setPlayers(players);
}

const podiumGetter = async (setPodium: any) => {

}

export default App;
