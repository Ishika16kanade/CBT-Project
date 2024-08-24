import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({ setAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setAuthenticated(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                navigate('/dashboard', { replace: false });
            }
        }
    }, [location, navigate, setAuthenticated])
    return (
        <div>


        </div>
    )
}

export default RefreshHandler