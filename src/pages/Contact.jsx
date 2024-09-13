import React from 'react';
import './Contact.css';
import ContactCard from '../components/ContactCard';
import { ImGift } from 'react-icons/im';


function Contact() {
    return (
        <div className='contact' id = 'contact'>
            <h1>Contact Information</h1>
            <div className='picsAndContactCard'>
                <img className='dissappearAt690' alt='JenPicLeft' src='./Jenpicleft.png'/>
                <ContactCard />
                <img className='dissappearAt690' alt='JenPicRight' src='./JenpicRight.png'/>
            </div>
            
        </div>
    );
}

export default Contact;