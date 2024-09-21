import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import './LocationBox.css'

function LocationBox(props) {
    return (
        <a className = 'locationBoxa' href = 'https://www.google.com/maps/place/1777+Main+St,+Tewksbury,+MA+01876/@42.5913304,-71.2109927,17z/data=!3m1!4b1!4m6!3m5!1s0x89e3a13568a13a4d:0x816d0fafaf2a63f1!8m2!3d42.5913304!4d-71.2084178!16s%2Fg%2F11vrjsszq7?entry=ttu&g_ep=EgoyMDI0MDkxMC4wIKXMDSoASAFQAw%3D%3D'>
            <div className={props.use == 'contactLocation' ? 'contactLocation' : 'container'}>
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
        </a>

    );
}

export default LocationBox;