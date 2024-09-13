import React from 'react'
import LocationBox from './LocationBox'
import './ContactCard.css'

function ContactCard(){
    return (
        <div className='contactCard'>
            <div class = 'faceAndName'>
                <img src ='./Profile pic.png' alt='pfpOfJen'/>
                <h2>Jen Giannotti</h2>
            </div>
            <h3>Phone:</h3>
            <p>603 - 235 - 2049</p>
            <h3>Email:</h3>
            <p style = {{marginBottom:"3px"}}>jenza001@icloud.com</p>
            <LocationBox use = 'contactLocation'/>

        </div>
    );

}

export default ContactCard;