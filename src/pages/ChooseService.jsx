import React from 'react';
import './ChooseService.css';
import Services from './Services';
import ButtonsRow from '../components/ButtonsRow.jsx';
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
            <ButtonsRow handleBackButton = {handleBackButtonClick} handleNextButton={props.handleNextButton} 
            nextButtonContent={<div>Choose Date<FaCalendar/></div>}/>

        </div>
    );
}

export default ChooseService;