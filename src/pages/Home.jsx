import React, {useState} from 'react';
import LandingPage from './LandingPage';
import Services from './Services';
import './Home.css'

function Home() {


    return (
        <div className = 'Home' id = 'Home'>
            <LandingPage />
            <Services />
        </div>

    );
}

export default Home;
