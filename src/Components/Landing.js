import React from 'react'
import './Landing.css'
import landing from '../Assets/landing-pic.png'

const Landing = () => {
    return (
        <div>
            {/* Navbar */}
            <div className='landing-content-main'>
                <div className='content-main'>
                    <img src={landing} alt='' className='landing-img'></img>
                    <h1 className='landing-main-heading'>Streamline your learning <br></br>and study smarter, not harder!</h1>
                    <p className='landing-sub-content'>Say goodbye to overwhelming textbooks and hello to concise points <br></br> that are easy to understand.</p>
                    <a href='#' className='landing-button'>Get Started!</a>
                </div>
            </div>
        </div>
    )
}

export default Landing