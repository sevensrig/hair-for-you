import React from 'react';
import BackButton from './BackButton.jsx';
import { FaArrowRight } from 'react-icons/fa6';
import './ButtonsRow.css'

function ButtonsRow(props) {
    return (
        <div className = 'buttons' style={{display:"flex", justifyContent:'space-between', paddingLeft:'1rem', paddingRight:'1rem', marginBottom:"1rem"}}>
        <BackButton onClick = {props.handleBackButton}/>
        <button className = 'nextButton' onClick={props.handleNextButton}>
            {props.nextButtonContent}
            </button>
        </div>
    )
}

export default ButtonsRow;
