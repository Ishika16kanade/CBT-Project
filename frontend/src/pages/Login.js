import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';
function Login() {
    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyloginInfo = { ...loginInfo };
        copyloginInfo[name] = value;
        setLoginInfo(copyloginInfo);
    }
    // console.log('signininfo', signinInfo);1

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('All fields Required');
        }
        try {
            const url = "http://localhost:4000/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);

                setTimeout(() => {
                    navigate('/dashboard')
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
            handleError(err);
        }
    }
    // git remote add origin https://github.com/Ishika16kanade/CBT-Full-Stack-Project.git
    return (
        <div className='back'>
            <div className='main'>
                <div className='container'>
                    <h1>Login</h1>
                    <form onSubmit={(e) => handleLogin(e)}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder='Enter your email'
                                value={loginInfo.email} />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                onChange={handleChange}
                                type='password'
                                name='password'
                                placeholder='Enter your password'
                                value={loginInfo.password} />
                        </div>
                        <button type='submit' >Login</button>


                        <button type='submit' >
                            <a href='/forgotpassword'> Forgot Password</a>
                        </button>
                        <span>Dont have an account ?
                            <Link to='/signup'>SignUp</Link>
                            {/* <a href='/forgotpassword'> Forgot Password</a> */}
                        </span>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Login