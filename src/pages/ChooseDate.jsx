import React from 'react'
import './ChooseDate.css'
import BookingCalendar from '../components/BookingCalendar';
import BackButton from '../components/BackButton';
import { Button } from 'react-scroll';
import { FaArrowRight } from 'react-icons/fa6';





function ChooseDate(props) {
    const times = ['11:00 AM', '12:00PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']
    return (
    <div className='chooseDate'>
        <div className='bookingCalendarDiv'>
            <BookingCalendar />
            <p>{props.selectedTime}</p>
        </div>
        <div className='timesContainer'>
            {times.map((time, index) => 
            <button style = {props.selectedTime === time ? {backgroundColor:'#F19A3E'}:{}} onClick = {() => props.setSelectedTime(time)} key={index} className='timeBox'>{time}</button>
            )}
        </div>
        <div className = 'buttons' style={{display:"flex", justifyContent:'space-between', paddingLeft:'1rem', paddingRight:'1rem'}}>
        <BackButton onClick = {props.handleBackButton}/>
        <button className = 'nextButton' onClick={props.handleNextButton}>
            Next
            <FaArrowRight className='arrowRight' />
            </button>
        </div>
    </div>
    );
}

export default ChooseDate;