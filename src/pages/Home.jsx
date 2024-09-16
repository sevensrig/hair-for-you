import React, {useState} from 'react';
import LandingPage from './LandingPage';
import Services from './Services';
import './Home.css'
import Contact from './Contact';
import Footer from '../components/Footer';

function Home() {


    return (
        <div className = 'Home' id = 'Home'>
            <LandingPage />
            <Services />
            <Contact />
            <Footer />
        </div>

    );
}

export default Home;
