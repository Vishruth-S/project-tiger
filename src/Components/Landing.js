import React from 'react'
import './Landing.css'
import landing from '../Assets/landing-pic.png'
import { Link } from 'react-router-dom'
import { BsRocketTakeoff } from 'react-icons/bs'
import { CgClapperBoard } from 'react-icons/cg'
import { FaRegLightbulb } from 'react-icons/fa'
import { TbFocus2 } from 'react-icons/tb'
import { SlGraduation } from 'react-icons/sl'

const Landing = () => {
    return (
        <div>
            {/* Navbar */}
            <div className='landing-content-main'>
                <div className='content-main'>
                    <img src={landing} alt='' className='landing-img'></img>
                    <h1 className='landing-main-heading'>Streamline your learning <br></br>and study smarter, not harder!</h1>
                    <p className='landing-sub-content'>Say goodbye to overwhelming textbooks and hello to concise points <br></br> that are easy to understand.</p>
                    <Link to='/learn' className='landing-button'>Get Started!</Link>
                </div>
            </div>
            <div className='uses-main'>
                <h1 className='section-heading'>Features</h1>
                <div className='uses-container'>
                    <div className='uses-item'>
                        <CgClapperBoard />
                        <h3>Accessible</h3>
                        <p>Easily Accessible</p>
                    </div>
                    <div className='uses-item'>
                        <FaRegLightbulb />
                        <h3>Smart</h3>
                        <p>Get Concise points</p>
                    </div>
                    <div className='uses-item'>
                        <BsRocketTakeoff />
                        <h3>Efficient</h3>
                        <p>Learn by answering questions</p>
                    </div>
                    <div className='uses-item'>
                        <TbFocus2 />
                        <h3>Focus</h3>
                        <p>Ask doubts</p>
                    </div>
                    <div className='uses-item'>
                        <SlGraduation />
                        <h3>Knowledge</h3>
                        <p>Personal Tutor</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing