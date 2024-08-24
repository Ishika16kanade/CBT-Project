import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';

const Forgotpassword = () => {
    const navigate = useNavigate();
    const [emailadd, setEmailadd] = useState('');

    console.log("email show", emailadd);
    const handleChange = (e) => {
        setEmailadd(e.target.value);
    }
    const submitHandle = async (e) => {
        e.preventDefault();
        // const { email } = emailadd;
        if (!emailadd) {
            return handleError('Enter Mail Id ');
        }
        try {
            const url = "http://localhost:4000/auth/forgotpassword";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({ 'email': emailadd })
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
            else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            }
            else if (!success) {
                handleError(message);
            }

            console.log(result);
        }
        catch (error) {
            handleError(error);
        }
    }
    return (
        <div className='back'>
            <div className='main'>
                <div className='container'>
                    <form onSubmit={(e) => submitHandle(e)}>
                        <h1>Forgot Password</h1>
                        <div>
                            <label htmlFor='email'>Email address</label>
                            <input type='email'
                                onChange={handleChange}
                                className='form-control'
                                placeholder='Enter Email'
                            />
                        </div>
                        <div className='d-grid'>
                            <button type='submit' className='btn btn-primary'> Send</button>

                        </div>

                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Forgotpassword






