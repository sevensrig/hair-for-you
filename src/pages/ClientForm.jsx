import React, { useState } from 'react'
import './ClientForm.css'
import ButtonsRow from '../components/ButtonsRow.jsx';
import { FaArrowRight } from 'react-icons/fa6';

function ClientForm(props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async () => {
        if (!props.clientName.trim() || !props.clientEmail.trim()) {
            setError('Please fill in your name and email.')
            return
        }
        setLoading(true)
        setError(null)
        try {
            const resp = await fetch('/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: props.clientName,
                    email: props.clientEmail,
                    service: props.serviceChosen,
                    date: props.dateChosen,
                    time: props.timeChosen,
                }),
            })
            if (!resp.ok) {
                const data = await resp.json()
                throw new Error(data.error || 'Booking failed')
            }
            props.handleNextButton()
        } catch (e) {
            setError(e.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='formBox'>
            <form className='formBox' onSubmit={e => e.preventDefault()}>
                <h3>Service: {props.serviceChosen}</h3>
                <h3>Date: {props.dateChosen}</h3>
                <h3>Time: {props.timeChosen}</h3>
                <div className='label'>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={props.clientName}
                            onChange={e => props.setClientName(e.target.value)}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={props.clientEmail}
                            onChange={e => props.setClientEmail(e.target.value)}
                        />
                    </label>
                </div>
                {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
            </form>

            <ButtonsRow
                handleBackButton={props.handleBackButton}
                handleNextButton={loading ? null : handleSubmit}
                nextButtonContent={
                    <div>{loading ? 'Booking…' : 'Book'}<FaArrowRight className='arrowRight'/></div>
                }
            />
        </div>
    );
}

export default ClientForm;
