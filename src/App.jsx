import React from 'react';
import './App.css';
import HomeNavBar from './components/HomeNavBar';
import Home from './pages/Home'; 
import Booking from './pages/Booking'; 
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path = '/' element = { <Home /> } />
        <Route path = "/book-an-appointment" element = { <Booking /> }/>
      </Routes>
    </div>
      
  );
}

export default App;
