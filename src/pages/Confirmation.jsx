import React from 'react'
import './Confirmation.css'
import { useNavigate } from 'react-router-dom'

function Confirmation(props) {
    const navigate = useNavigate()

    const formatDate = (dateStr) => {
        if (!dateStr) return ''
        const [year, month, day] = dateStr.split('-')
        const d = new Date(Number(year), Number(month) - 1, Number(day))
        return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <div className='confirmationWrapper'>
            <div className='confirmationCard'>
                <div className='confirmationIcon'>✓</div>
                <h2>You're booked!</h2>
                <p className='confirmationSubtitle'>We'll see you soon. Here are your appointment details:</p>
                <div className='confirmationDetails'>
                    <div className='confirmationRow'>
                        <span className='confirmationLabel'>Service</span>
                        <span className='confirmationValue'>{props.serviceChosen}</span>
                    </div>
                    <div className='confirmationRow'>
                        <span className='confirmationLabel'>Date</span>
                        <span className='confirmationValue'>{formatDate(props.dateChosen)}</span>
                    </div>
                    <div className='confirmationRow'>
                        <span className='confirmationLabel'>Time</span>
                        <span className='confirmationValue'>{props.timeChosen}</span>
                    </div>
                    <div className='confirmationRow'>
                        <span className='confirmationLabel'>Name</span>
                        <span className='confirmationValue'>{props.clientName}</span>
                    </div>
                    <div className='confirmationRow'>
                        <span className='confirmationLabel'>Email</span>
                        <span className='confirmationValue'>{props.clientEmail}</span>
                    </div>
                </div>
                <div className='confirmationActions'>
                    <button className='confirmationBtnPrimary' onClick={() => navigate('/')}>Back to Home</button>
                    <button className='confirmationBtnSecondary' onClick={() => navigate('/booking')}>Book Another</button>
                </div>
            </div>
        </div>
    )
}

export default Confirmation
