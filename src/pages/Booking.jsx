import React from 'react';
import ChooseService from './ChooseService';
import './Booking.css'
import { useState } from 'react';
import ChooseDate from './ChooseDate';
import ClientForm from './ClientForm';



function Booking () {
    const [ selectedService, setSelectedService ] = useState('');
    const [ selectedDate, setSelectedDate ] = useState('');
    const [ selectedTime, setSelectedTime ] = useState('');
    const [ activePage, setActivePage ] = useState('chooseService');
    const [ clientName, setClientName ] = useState('');
    const [ clientEmail, setClientEmail ] = useState('');

    const renderActivePage = () => {
        switch (activePage) {
            case 'chooseService':
                return (
                    <ChooseService handleNextButton = {selectedService==="" ? null : () => setActivePage('chooseDate')} 
                    selectedService = {selectedService} setSelectedService = {setSelectedService} />
                );
            case 'chooseDate':
                return (
                    <ChooseDate selectedTime = {selectedTime} setSelectedDate = {setSelectedDate} setSelectedTime = {setSelectedTime} handleNextButton = {() => setActivePage('clientForm')} 
                    handleBackButton = {() => setActivePage('chooseService')}/>
                );
            case 'clientForm':
                return (
                    <ClientForm dataChosen = {selectedDate} serviceChosen = {selectedService} timeChosen = {selectedTime}
                    clientEmail = {clientEmail} clientName = {clientName} handleNextButton = {() => setActivePage('confirmation')}
                    handleBackButton = {() => setActivePage('chooseDate')}/> 
                );
            case 'confirmation':
                return(
                    <div>hi</div>
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