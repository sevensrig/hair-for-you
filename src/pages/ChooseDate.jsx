import React, { useEffect, useState } from 'react'
import './ChooseDate.css'
import BookingCalendar from '../components/BookingCalendar';
import BackButton from '../components/BackButton';
import { FaArrowRight } from 'react-icons/fa6';
import ButtonsRow from '../components/ButtonsRow';





function ChooseDate(props) {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [times, setTimes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const formatDate = (date) => {
        const iso = date.toISOString()
        return iso.split('T')[0]
    }

    const fetchAvailability = async (date) => {
        try {
            setLoading(true)
            setError(null)
            const resp = await fetch(`/api/availability?date=${formatDate(date)}`)
            if (!resp.ok) {
                throw new Error('Failed to fetch availability')
            }
            const data = await resp.json()
            setTimes(Array.isArray(data.times) ? data.times : [])
        } catch (e) {
            setError(e.message || 'Something went wrong')
            setTimes([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        props.setSelectedDate(formatDate(selectedDate))
        fetchAvailability(selectedDate)
    }, [selectedDate])

    return (
    <div className='chooseDate'>
        <div className='timesAndCalendarContainer'>
            <BookingCalendar selectedDate={selectedDate} onChangeDate={setSelectedDate} />
            <span className = 'divider'/>
        <div className='timesContainer'>
            {loading && <div>Loading available times…</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!loading && !error && times.length === 0 && (
                <div>No available times for this date.</div>
            )}
            {!loading && !error && times.length > 0 && (
                times.map((time, index) => 
                    <button style = {props.selectedTime === time ? {backgroundColor:'#F19A3E'}:{}} 
                    onClick = {() => props.setSelectedTime(time)} key={index} className='timeBox'>{time}</button>
                )
            )}
        </div>
        </div>
        <ButtonsRow handleBackButton = {props.handleBackButton} handleNextButton={props.handleNextButton} nextButtonContent={<div>Next<FaArrowRight className='arrowRight'/></div>}/>
    </div>
    );
}

export default ChooseDate;