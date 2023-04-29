import React from 'react'
import { BsRobot } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';

const CoachMessage = ({ messages }) => {
    return (
        <div>
            {messages.map((messageObj, index) => (
                <div key={index}>
                    {messageObj.sender === "ChatGPT" ?
                        <div className="chat-message chat-message-robot" >
                            <span className="chat-message-sender"><BsRobot /></span>
                            <span className="chat-message-text">
                                <ReactMarkdown>{messageObj.message}
                                </ReactMarkdown>
                            </span>
                        </div>
                        : <div className="chat-message chat-message-user" >
                            <span className="chat-message-sender"><FaUserCircle /></span>
                            <span className="chat-message-text">
                                <ReactMarkdown>{messageObj.message}
                                </ReactMarkdown>
                            </span>
                        </div>}
                </div>
            ))}
        </div>
    )
}

export default CoachMessage