import React from 'react'
import './ClientForm.css'
import '../components/ButtonsRow.jsx'
import ButtonsRow from '../components/ButtonsRow.jsx';
import { FaArrowRight } from 'react-icons/fa6';

function ClientForm(props) {
    return(
        <div className='formBox'>
                <form className='formBox'>
                    <h3>Service Chosen: {props.serviceChosen}</h3>
                    <h3>Date Chosen:{props.dateChosen}</h3>
                    <h3>Time Chosen:{props.timeChosen}</h3>
                    <div className='label'>
                        <label>Name:<input type="text" /></label>
                        <label>Email:<input type="text" /></label>    
                    </div>
                    
                </form>

            <ButtonsRow handleBackButton = {props.handleBackButton} handleNextButton={props.handleNextButton} 
            nextButtonContent={<div>Next<FaArrowRight className='arrowRight'/></div>}/>
        </div>
    );
}

export default ClientForm;