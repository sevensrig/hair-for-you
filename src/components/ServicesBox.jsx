import React from 'react';
import { useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import './ServicesBox.css'

function ServicesBox(props) {
    const serviceAndPrice = Object.entries(props.activeServiceList);
    return (
        <div className='serviceListContainer'>
            <div className='boxName'>
                <h3>{props.activeServiceName}</h3>
                <FaMagnifyingGlass className='mg'/>
            </div>
            <span/>
            {serviceAndPrice.map(([service, price, index]) => (
            <div id = {index} className={props.use ? 'booking' : 'display'}>
                <div style={{display:"flex"}}>
                    <input type='checkbox' onChange = {() => props.handleCheck(service)} checked={props.checkedService===service}/>
                    <p style={{ lineHeight:"26px"}}>{service}</p>
                </div>
                <p style={{ lineHeight:"26px"}}>{price}</p>
            </div>

        ))}
        </div>
    );
}

export default ServicesBox;