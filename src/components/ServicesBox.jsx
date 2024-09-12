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
            {serviceAndPrice.map(([service, price]) => (
            <div>
                <p>{service}</p>
                <p>{price}</p>
            </div>

        ))}
        </div>
    );
}

export default ServicesBox;