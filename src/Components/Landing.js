import React from 'react'
import './Landing.css'
import landing from '../Assets/landing-pic.png'
import { Link } from 'react-router-dom'
import { RiFileTextLine} from 'react-icons/ri';
import { CgClapperBoard } from 'react-icons/cg';
import { BsStopwatch } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FaChalkboardTeacher } from 'react-icons/fa';

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
                        <RiFileTextLine />
                        <h3>Summarize</h3>
                        <p> Condenses textbook data into concise points</p>
                    </div>
                    <div className='uses-item'>
                        <BsStopwatch />
                        <h3>Efficient</h3>
                        <p>Saves time by simplifying study prep and exam preparation</p>
                    </div>
                    <div className='uses-item'>
                        <CgClapperBoard />
                        <h3>Accessible</h3>
                        <p>Simplified and accessible learning for all backgrounds</p>
                    </div>
                    <div className='uses-item'>
                        <FaChalkboardTeacher />
                        <h3>Tutor</h3>
                        <p>Ask doubts and improve your understanding</p>
                    </div>
                    <div className='uses-item'>
                        <AiOutlineCheckCircle />
                        <h3>Assess</h3>
                        <p> Provides real-time assessment and feedback to track progress and improve understanding</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing