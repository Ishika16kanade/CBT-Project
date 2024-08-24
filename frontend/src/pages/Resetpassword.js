import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const Resetpassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleChange = (e) => {
        setPassword(e.target.value);
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (password !== confirmPassword) {
    //         setMessage("Passwords  not match");
    //         return;
    //     }
    //     try {
    //         console.log("message");
    //         const url = `http://localhost:4000/auth/resetpassword?token=${token}`;
    //         const response = await fetch(url, {
    //             method: "POST",
    //             headers: {
    //                 'content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ password: password })
    //         });
    //         const result = await response.json();

    //         if (result.status == 200) {
    //             setPassword("");
    //             setMessage = "true"
    //         }
    //         else {
    //             console.log('error')
    //             toast.error("Invalid User")
    //         }
    //         const { success, message, error } = result;
    //         if (success) {
    //             handleSuccess(message);
    //             setTimeout(() => {
    //                 navigate('/login')
    //             }, 1000)
    //         }
    //         else if (error) {
    //             const details = error?.details[0].message;
    //             handleError(details);
    //         }
    //         else if (!success) {
    //             handleError(message);
    //         }

    //     }
    //     catch (error) {
    //         handleError(error);
    //         console.log('error', error);
    //     }

    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        try {
            const url = `http://localhost:4000/auth/resetpassword?token=${token}`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: password })
            });
            const result = await response.json();

            if (result.status === 200) {
                setPassword("");
                setMessage("true");
            } else {
                console.log('error');
                toast.error("Invalid User");
            }

            const { success, message, error } = result || {};
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message || "An error occurred";
                handleError(details);
            } else if (!success) {
                handleError(message);
            }

        } catch (error) {
            handleError(error);
            console.log('error', error);
        }
    };

    return (
        <div className='main'>
            <div className='container'>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor='new password'>New Password</label>
                        <input type='password'
                            onChange={handleChange}
                            className='form-control'
                            placeholder='Enter password'



                        />
                    </div>
                    <div>
                        <label htmlFor='Confirm password'>Confirm Password</label>
                        <input type='password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='form-control'
                            placeholder='Enter password'

                        />
                    </div>
                    <div className='d-grid'>
                        <button type='submit' className='btn btn-primary'> Update</button>
                    </div>


                </form>
                <p>{message}</p>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Resetpassword;
