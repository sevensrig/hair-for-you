import React from 'react'
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import './MenuList.css';

function MenuList(props) {
    return (
        <div className='menuList'>
            <ul className = {props.menuOpen}>
                <li> <ScrollLink to="Services" spy={true} smooth={true} duration={500}>Services</ScrollLink></li>
                <li> <ScrollLink to="contact" spy={true} smooth={true} duration={500}>Contact</ScrollLink></li>
                <li> <Link to="/book-an-appointment">Book Appointment</Link> </li>
            </ul>
        </div>

    );
}

export default MenuList;