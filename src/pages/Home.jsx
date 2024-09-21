import React, {useState} from 'react';
import LandingPage from './LandingPage';
import Services from './Services';
import './Home.css'
import Contact from './Contact';
import Footer from '../components/Footer';
import HomeNavBar from '../components/HomeNavBar';

function Home() {


    return (
        <div className = 'Home' id = 'Home'>
            <HomeNavBar />
            <LandingPage />
            <Services />
            <Contact />
            <Footer />
        </div>

    );
}

export default Home;
