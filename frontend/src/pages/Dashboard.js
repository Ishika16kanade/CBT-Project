import React from 'react';
import '../App.css'
import Widget from './Widget';
import { handleSuccess } from '../util';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Profile from './Profile';
import ProfileCard from './Profile';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('log In User');
        handleSuccess('User LogOut')
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
    return (
        <div className='back'>
            <div className="dashboard">
                <div className="dashboard-header">
                    <button className='dashbtn' onClick={handleLogout}>LogOut</button>
                    <h1>Dashboard</h1>
                    <p>Welcome Ishika Kanade</p>
                </div>
                <div className="dashboard-widgets">
                    <Widget title='Name' text="Ishika Kanade" />
                    <Widget title='Mobile No' text="9044243230" />
                    <Widget title='Email Id' text="ishikakanade@gmail.com" />
                    <Widget title='Bio' text="Full Stack Intern " />

                </div>
                {/* <Profile /> */}
                <ToastContainer />

            </div>
        </div>
    );
};

export default Dashboard;
