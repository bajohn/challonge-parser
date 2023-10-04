import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './App.css';
import { rootUrl } from './util/constants';
function BasicFunc() {
  return <div></div>
}
function App() {

  return (
    <div className="App">
      <RankingTable>

      </RankingTable>

    </div>

  );
}



function RankingTable(props: any) {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    apiGetter(setPlayers);
  }, []);
  let counter = 0;
  return (<Table striped bordered hover>

    <thead>
      <tr>
        <th scope="col">Rank</th>
        <th scope="col">Player</th>
        <th scope="col">Wins</th>
        <th scope="col">Losses</th>
        <th scope="col">Win %</th>
      </tr>
    </thead>
    <tbody>
      {players.map((player: any) => {
        counter += 1;
        return (
          <tr key={player.playerName}>
            <th > {counter}  </th>
            <th scope="row"> {player.playerName} </th>
            <td> {player.w}</td>
            <td> {player.l}</td>
          </tr>

        )
      })}
    </tbody>
  </Table>);
}

const apiGetter = async (setPlayers: any) => {

  const resp = await fetch(`${rootUrl}get-players`)
  const jsonResp = await resp.json();
  setPlayers(jsonResp.players);
}

export default App;
