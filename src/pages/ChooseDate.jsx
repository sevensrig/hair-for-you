import React from 'react'
import './ChooseDate.css'
import BookingCalendar from '../components/BookingCalendar';
import BackButton from '../components/BackButton';
import { Button } from 'react-scroll';
import { FaArrowRight } from 'react-icons/fa6';





function ChooseDate(props) {
    return (
    <div className='chooseDate'>
        <BookingCalendar />
        <BackButton onClick = {props.handleBackButton}/>
        <button className = 'nextButton' onClick={props.handleNextButton}>Next<FaArrowRight className='arrowRight' /></button>
    </div>
    );
}

export default ChooseDate;