import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'

const Navbar = () => {
    return (
        <div className="nav-main">
            <div className='nav-main-left'>
                <img src={logo} alt="logo" />
                <Link to="/">
                    <h2>
                        LearnByte
                    </h2>
                </Link>
            </div>
            <div>
                <Link to="/learn">Learn</Link>
                <Link to="/coach">Chat</Link>
            </div>
        </div >
    )
}

export default Navbar