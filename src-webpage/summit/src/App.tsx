import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';

import Mainpage from './pages/Mainpage';
import Notfound from './pages/Notfound';
import Admin from './pages/Adminpage';

function App() {

  return (


    <Routes>
      <Route path="/" element={<Mainpage />}>
        <Route index element={<Mainpage />} />
        {/* <Route path="admin" element={<Admin />} />
        <Route path="dashboard" element={<Dashboard />} /> */}

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}

      </Route>
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Notfound />} />
    </Routes>

  );
}



export default App;
