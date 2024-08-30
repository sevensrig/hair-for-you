import React, {useState} from 'react';
import LandingPage from '../components/LandingPage';

function Home() {
    const [contact, setContact] = useState(false);
    const [services, setServices] = useState(false);

    return (
        <LandingPage />
    );
}

export default Home;
