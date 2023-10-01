import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  apiGetter();
  return (
    <div className="App">
      Hello world
    </div>
  );
}

const apiGetter = async () => {
  const resp = await fetch('https://xx3ptt5y85.execute-api.us-west-2.amazonaws.com/summit-stage/test')
  const jsonResp = await resp.json();
  console.log(jsonResp);
}

export default App;
