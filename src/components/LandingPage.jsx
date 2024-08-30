import React from 'react'
import LocationBox from './LocationBox';
import './LandingPage.css'
import { FaScissors } from "react-icons/fa6";


function LandingPage() {
    return (
        <div className = 'landingPage' id = 'landingPage'>
            <div className = 'textContainer'>
                <h1>Welcome to</h1>
                <h1 style = {{color: '#F19A3E'}}>Hair For You!</h1>
                <p>We offer a multitude of different services for all your Hair Care needs!</p>
                <h2>Ready to Book?</h2>
                <button className = "bookButton">Book Appointment<FaScissors className='faScissors'/></button>
            </div>
            <div className='imageAndLocation'>
                <div className='locationBox'><LocationBox /></div>
                <img className = 'image' src='/girlWithHair.png' alt = 'girl with hair'/>
            </div>

        
            
        </div>
    );
}

export default LandingPage;