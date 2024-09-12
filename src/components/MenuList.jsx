import React from 'react'
import { Link } from 'react-router-dom';
import './MenuList.css';

function MenuList(props) {
    return (
        <div className='menuList'>
            <ul className = {props.menuOpen}>
                <li> <Link to="/services">Services</Link></li>
                <li> <Link to="/contact">Contact</Link></li>
                <li> <Link to="/book-an-appointment">Book Appointment</Link> </li>
            </ul>
        </div>

    );
}

export default MenuList;