import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

export function PodiumFinishes(props: any) {
    const FIRST_PLACE = 'First Place Finishes';
    const SECOND_PLACE = 'Second Place Finishes';
    const THIRD_PLACE = 'Third Place Finishes';
    const podiums = props.podiums;
    console.log('in', podiums)
    const store: any = {}
    for (const podiumName of Object.keys(podiums)) {
      const podium = podiums[podiumName];
      for (const name of Object.keys(podium)) {
        if (!(name in store)) {
          store[name] = {};
          store[name][FIRST_PLACE] = 0;
          store[name][SECOND_PLACE] = 0;
          store[name][THIRD_PLACE] = 0;
        }
        store[name][podiumName] = podium[name];
      }
    }
    console.log(store);
    console.log(JSON.stringify(store));
  
  
    const playerArr = Object.keys(store).map(name => {
      const cur = store[name]
      cur['playerName'] = name;
      return cur;
    });
    console.log(playerArr);
    playerArr.sort((a, b) => {
      if (a[FIRST_PLACE] > b[FIRST_PLACE]) {
        return -1
      } else if ((a[FIRST_PLACE] === b[FIRST_PLACE] && a[SECOND_PLACE] > b[SECOND_PLACE])) {
        return -1
      } else if ((a[SECOND_PLACE] === b[SECOND_PLACE] && a[THIRD_PLACE] > b[THIRD_PLACE])) {
        return -1
      }
      return 1;
    });
  
  
    const getMedals = (cur: any) => {
      let ret = '';
      const lookup: any = {};
      lookup[FIRST_PLACE] = '🥇';
      lookup[SECOND_PLACE] = '🥈';
      lookup[THIRD_PLACE] = '🥉';
  
      for (const podiumName of Object.keys(lookup)) {
        if (podiumName in cur) {
          while (cur[podiumName] > 0) {
            ret += lookup[podiumName];
            cur[podiumName] -= 1;
          }
        }
      }
      return ret;
    }
  
  
  
    return (<Table striped bordered hover>
  
      <thead>
        <tr>
          <th scope="col">Player</th>
          <th scope="col">Finishes</th>
        </tr>
      </thead>
      <tbody>
        {playerArr.map((player: any) => {
          return (
            <tr key={player.playerName}>
              <td>
                {player.playerName}
              </td>
              <td>
                {getMedals(player)}
              </td>
  
            </tr>
  
          )
        })}
      </tbody>
    </Table>);
  
  }