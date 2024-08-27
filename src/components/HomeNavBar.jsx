import React from 'react';
import { Link } from 'react-router-dom';
import './HomeNavBar.css';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import MenuList from './MenuList';

function HomeNavBar(props) {
   const [ menuOpen, setMenuOpen] = useState(false);
   function handleHamburgerClick() {
    setMenuOpen((menuOpen) => !menuOpen);
   }
    return (
        <div>
            <nav className= {menuOpen ? "open" : ""}>
                <MenuList menuOpen = {menuOpen ? "open" : ""} />
                <div className = {'centerTitleWrapper ' + menuOpen ? "open" : ""}>
                    <Link to = "/" className='title'>Hair For You</Link>
                </div>
                <FaBars className = 'hamburger' onClick = {handleHamburgerClick}/>
            </nav> 
            <span />
        </div>
        
    );
}

export default HomeNavBar;
