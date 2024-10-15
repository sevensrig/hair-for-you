import React from 'react';
import './ChooseService.css';
import Services from './Services';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import { FaCalendar } from 'react-icons/fa6';

function ChooseService(props) {
    const linkTo = useNavigate();
    function handleBackButtonClick() {
        linkTo('/');
    }

    return (
        <div className='chooseService'>
            <Services selectedService = {props.selectedService} setSelectedService = {props.setSelectedService} use = 'booking'/>
            <div className='buttons' style={{display:"flex", justifyContent:'space-between', paddingLeft:'1rem', paddingRight:'1rem'}}>
                <BackButton onClick = {handleBackButtonClick} className='backButton'/>
                <button onClick = {props.handleSelectDateButton}className='selectDate'>Select Date<FaCalendar className='calendar'/></button>
            </div>

        </div>
    );
}

export default ChooseService;