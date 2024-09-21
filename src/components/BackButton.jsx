import React from 'react'
import './BackButton.css'
import { FaArrowLeft } from 'react-icons/fa6';

function BackButton(props) {
    return (
        <div className='backButton'>
            <button onClick={props.onClick}><FaArrowLeft className='arrowLeft' />Back</button>
        </div>
    );
}

export default BackButton;