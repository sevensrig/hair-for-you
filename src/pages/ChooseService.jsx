import React from 'react';
import './ChooseService.css';
import ServicesBar from '../components/ServicesBar';
import ServicesBox from '../components/ServicesBox';
import Services from './Services';

function ChooseService() {
    return (
        <div>
            <Services use = 'booking'/>
        </div>
    );
}

export default ChooseService;