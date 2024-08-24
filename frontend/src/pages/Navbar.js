import React from 'react'

import '../pages/Navbar.css'
const Navbar = () => {
    return (
        <>
            <header className='header'>
                <h1 className='logo'>ConnectSphere</h1>

                <nav className='navbar'>
                    <a href='/login'>Login</a>
                    <a href='/signup'>SignUp</a>
                </nav>

            </header>

            <div className="landing-page">
                <div className="content">
                    <h1 className="full-name">Ishika Kanade</h1>
                </div>
            </div>

        </>
    )
}

export default Navbar