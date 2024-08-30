import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import './LocationBox.css'

function LocationBox() {
    return (
        <div className='container'>
            <div className='address'>
                <h3>Address:</h3>
                <p>1777 Main St</p>
                <p>Suite 12</p>
                <p>Tewksbury, MA, 01867</p>
            </div>
            <div className='pinContainer'>
                <FaLocationDot className = "pin"/>
            </div>  
        </div>
    );
}

export default LocationBox;