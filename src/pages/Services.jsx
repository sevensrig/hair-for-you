import React from 'react'
import './Services.css'
import ServicesBar from '../components/ServicesBar';
import { useState } from 'react';
import ServicesBox from '../components/ServicesBox';


function Services() {
    const servicesOffered = ['Hair Services', 'Bangs', 'Facial Waxing', 'Beard Services'];
    const [ activeServiceName, setActiveServiceName ] = useState('Hair Services');
    const hairServices = {'Mens Cut/Clippers': '$30', 'Cap Highlights': '$135', 
        'Cap Highlights & Cut' : '$150', 'Color & Blow dry' : '$120', 'Color & Blowout': '$135', 'Color & Cut': '$125', 'Color Correction':'$200', 'Color Only':'$110', 'Conditioning Treatment':'$35'
    ,'Foils Per Piece':'$15', 'Full Foil, Color & Cut':'$275','Full Foil & Cut':'$200','Kids Cut':'$15','Mohawk Foil & Color':'$120','Partial Foil, Color & Cut':'$185','Perm':'$100'
    ,'Senior Cut':'$25','Updo':'$120','Wash & Curling Iron':'$45','Wash & Cut':'$45','Wash & Set':'$35','Wet Cut':'$40',"Woman's Wash, Cut, Blowdry":'$55',"Woman's Blowouts":'$50'};
    const bangsServices = {"Bangs Trim":"$10"}
    const facialServices = {"Eyebrows & Lip Waxing":"$30", "Eyebrow Waxing":"$12","Chin Waxing":"$10","Facial Hair Waxing":"$50","Lip Waxing":"$10","Lip, Chin & Eyebrow Waxing":"$40"};
    const beardServices = {"Beard Trim":"$15"};
    const servicesListOrganization = {'Hair Services':hairServices, 'Bangs':bangsServices, 'Facial Waxing':facialServices, 'Beard Services':beardServices}
    return (

        <div className = 'Services' id = "Services">
            <h1>Services</h1>
            <h3>Check out what services we have to offer!</h3>
            <ServicesBar handleClick = {setActiveServiceName} activeServiceName = {activeServiceName} servicesList = {servicesOffered}/>
            <ServicesBox className = 'servicesBox' activeServiceName = {activeServiceName} activeServiceList = {servicesListOrganization[activeServiceName]}/> 
        </div>
    );
}

export default Services;
