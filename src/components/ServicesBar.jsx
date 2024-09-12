import React from 'react';
import './ServicesBar.css'
import { useState } from 'react';



function ServicesBar(props) {

    return (
        <div className = "servicesBar">
            
            <ul>
                {props.servicesList.map((service) => (
                    <button className = {props.activeServiceName == service ? 'active' : ''} 
                    onClick = {() => props.handleClick(service)}>{service}</button>))}
            </ul>

        </div>
    );
}

export default ServicesBar;