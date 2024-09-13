import React, {useState} from 'react';
import LandingPage from './LandingPage';
import Services from './Services';
import './Home.css'
import Contact from './Contact';

function Home() {


    return (
        <div className = 'Home' id = 'Home'>
            <LandingPage />
            <Services />
            <Contact />
        </div>

    );
}

export default Home;
