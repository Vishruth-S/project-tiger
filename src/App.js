import React from 'react';
import Chat from './Components/Chat/Chat';
import './App.css'
import Landing from './Components/Landing';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Coach from './Components/Coach/Coach';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/learn' element={<Chat />} />
        <Route path='/coach' element={<Coach />} />
      </Routes>
      {/* <Chat /> */}
    </div>
  );
}

export default App;
