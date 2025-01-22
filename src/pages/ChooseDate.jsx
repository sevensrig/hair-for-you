import React from 'react'
import './ChooseDate.css'
import BookingCalendar from '../components/BookingCalendar';
import BackButton from '../components/BackButton';
import { FaArrowRight } from 'react-icons/fa6';
import ButtonsRow from '../components/ButtonsRow';





function ChooseDate(props) {
    const times = ['11:00 AM', '12:00PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']
    return (
    <div className='chooseDate'>
        <div className='timesAndCalendarContainer'>
            <BookingCalendar />
            <span className = 'divider'/>
        <div className='timesContainer'>
            {times.map((time, index) => 
            <button style = {props.selectedTime === time ? {backgroundColor:'#F19A3E'}:{}} 
            onClick = {() => props.setSelectedTime(time)} key={index} className='timeBox'>{time}</button>
            )}
        </div>
        </div>
        <ButtonsRow handleBackButton = {props.handleBackButton} handleNextButton={props.handleNextButton} nextButtonContent={<div>Next<FaArrowRight className='arrowRight'/></div>}/>
    </div>
    );
}

export default ChooseDate;