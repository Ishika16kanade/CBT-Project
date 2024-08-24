import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';

function Signup() {
    const navigate = useNavigate();

    const [signupInfo, setSignupInfo] = useState({
        firstname: '',
        email: '',
        password: '',
        mobileno: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copysignupInfo = { ...signupInfo };
        copysignupInfo[name] = value;
        setSignupInfo(copysignupInfo);
    }
    console.log('signIninfo', signupInfo);

    const handleSignup = async (e) => {
        e.preventDefault();
        const { firstname, email, password, mobileno } = signupInfo;
        if (!firstname || !email || !password || !mobileno) {
            return handleError('All fields Required');
        }
        try {
            console.log("Hello");

            const url = "http://localhost:4000/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            console.log("Hello1", response);
            const result = await response.json();
            console.log("result", result);
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
        } catch (err) {
            console.log(err);
            handleError(err);

        }
    }

    return (
        <div className='back'>
            <div className='main'> <div className='container'>
                <h1>SignUp</h1>
                <form onSubmit={(e) => handleSignup(e)}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='firstname'
                            autoFocus
                            placeholder='Enter your name'
                            value={signupInfo.firstname}
                        />

                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='email'
                            placeholder='Enter your email'
                            value={signupInfo.email} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            value={signupInfo.password} />
                    </div>
                    <div>
                        <label htmlFor='mobile'>Phone No</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='mobileno'
                            placeholder='Enter your Mobile no'
                            value={signupInfo.mobileno} />
                    </div>
                    <button type='submit' >SIgn Up</button>
                    <span>Already have an account ?
                        <Link to='/login'> Login</Link>
                    </span>

                </form>
                <ToastContainer />
            </div>
            </div>
        </div>
    )
}

export default Signup