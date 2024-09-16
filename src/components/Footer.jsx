import React from 'react'
import './Footer.css'
import { Link as ScrollLink } from 'react-scroll';
import { FaFacebookF } from 'react-icons/fa6';
import { FaAngleUp } from 'react-icons/fa6';
import { FaPhone } from 'react-icons/fa6';

function Footer() {
    return (
        <div className='footer'>
            <div className='contactButtons'>
                <p>Hair For You Contacts</p>
                <div className='fbAndPhone'>
                    <div className='buttonsRow'>
                        <a href='https://www.facebook.com/Jenza001/'><FaFacebookF color='white'/></a>
                        <a href="sms:603 - 235 - 2049"><FaPhone color='white'/></a>
                    </div>

                </div>

            </div>
            <div className='scrollUp'>
                <h3>Back to the top</h3>
                <ScrollLink to="landingPage" offset = {-50} spy={true} smooth={true} duration={500}><FaAngleUp color='white'/></ScrollLink>
            </div>
        </div>
    );
}

export default Footer;