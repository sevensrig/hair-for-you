import React from 'react'
import './ClientForm.css'

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
        </div>
    );
}

export default ClientForm;