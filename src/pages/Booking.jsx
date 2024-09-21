import React from 'react';
import ChooseService from './ChooseService';
import './Booking.css'


function Booking () {
    return (
    <div className='Booking'>
        <h1>Request Appointment</h1>
        <ChooseService />
    </div>
    );
}

export default Booking;