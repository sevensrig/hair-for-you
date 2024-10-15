import React from 'react'
import { Calendar } from 'react-calendar';
import './BookingCalendar.css'
import 'react-calendar/dist/Calendar.css';

function BookingCalendar() {
    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
          const day = date.getDay();
          return day === 0;
        }
        return false;
      };
    return (
        <div className='bookingCalendar'>
            <Calendar minDetail = "month" prev2Label = {null}  next2Label = {null} minDate = {new Date()} className = 'react-calendar' tileDisabled={tileDisabled}/>
        </div>
    );
}

export default BookingCalendar;