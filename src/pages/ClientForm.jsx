import React from 'react'
import './ClientForm.css'
import '../components/ButtonsRow.jsx'
import ButtonsRow from '../components/ButtonsRow.jsx';

function ClientForm(props) {
    return(
        <div className='formBox'>
            <form>
                <h3>{props.serviceChosen}</h3>
                <h3>{props.dateChosen}</h3>
                <h3>{props.timeChosen}</h3>
                <label>Name:<input type="text" /></label>
                <label>Email:<input type="text" /></label>
            </form>
            <ButtonsRow handleBackButton = {props.handleBackButton} handleNextButton={props.handleNextButton}/>
        </div>
    );
}

export default ClientForm;