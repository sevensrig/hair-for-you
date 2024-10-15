import React from 'react'
import './ClientForm.css'

function ClientForm(props) {
    return(
        <div className='formBox'>
            <form>
                <label>Name:<input type="text" /></label>
                <label>Email:<input type="text" /></label>
            </form>
        </div>
    );
}

export default ClientForm;