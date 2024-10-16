import React from 'react';
import ChooseService from './ChooseService';
import './Booking.css'
import { useState } from 'react';
import ChooseDate from './ChooseDate';
import ClientForm from './ClientForm';



function Booking () {
    const [ selectedService, setSelectedService ] = useState('');
    const [ selectedDate, setSelectedDate ] = useState('');
    const [ previousPage, setPreviousPage ] = useState();
    const [ activePage, setActivePage ] = useState('chooseService');
    const [ clientName, setClientName ] = useState('');
    const [ clientEmail, setClientEmail ] = useState('');

    const renderActivePage = () => {
        switch (activePage) {
            case 'chooseService':
                return (
                    <ChooseService handleSelectDateButton = {() => setActivePage('chooseDate')} selectedService = {selectedService} setSelectedService = {setSelectedService}/>
                );
            case 'chooseDate':
                return (
                    <ChooseDate handleNextButton = {() => setActivePage('clientForm')} 
                    handleBackButton = {() => setActivePage('chooseService')}/>
                );
            case 'clientForm':
                return (
                    <ClientForm clientEmail = {clientEmail} clientName = {clientName}/> 
                );
            default:
                return <div></div>;
        }
    };

    return (
    <div className='Booking'>
        <h1>Request Appointment</h1>
        {renderActivePage()}
    </div>
    );
}

export default Booking;