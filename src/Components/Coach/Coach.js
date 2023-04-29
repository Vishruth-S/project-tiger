import React from 'react'
import { useState } from 'react';
import { BsSend } from "react-icons/bs";
import './Coach.css'
import CoachMessage from './CoachMessage';
/* eslint-disable no-undef */

const Coach = () => {
    const [messages, setMessages] = useState([]);
    const [loadingMsg, setLoadingMsg] = useState(false)
    const [textData, setTextData] = useState('')
    const [inputMsg, setInputMsg] = useState('')

    async function processMessageChatgpt(chatMessages) {
        let apiMessages = chatMessages.map((messageObj) => {
            let role = ""
            if (messageObj.sender === "ChatGPT") {
                role = "assistant"
            } else {
                role = "user"
            }
            return { role: role, content: messageObj.message }
        })

        const systemMessage = {
            role: "system",
            content: "Read the following Content Carefully. " + textData + " .Now answer any doubts that I will ask you."
        }

        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [systemMessage, ...apiMessages]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.REACT_APP_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json()
        }).then(async (data) => {
            let msgs = [...chatMessages, {
                sender: "ChatGPT",
                message: data.choices[0].message.content
            }]
            setMessages(msgs)
        })
    }

    const handleSend = async (e) => {
        if (inputMsg === '')
            return;
        if (e !== 0) e.preventDefault();
        setLoadingMsg(true)
        setInputMsg('')
        let newMessage = {
            message: inputMsg,
            sender: "user",
            direction: "outgoing"
        }

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        await processMessageChatgpt(newMessages);
        setLoadingMsg(false)
    }

    const enterPressed = (e) => {
        let code = e.keyCode || e.which;
        if (code === 13 && !e.shiftKey) {
            handleSend(e);
        }
    }

    return (
        <div>
            <div className='main-container'>
                <div className='user-input-section'>
                    <h3>Enter the stuff you want to learn</h3>
                    <div>
                        <textarea
                            className="learn-chat-input"
                            value={textData}
                            onChange={e => setTextData(e.target.value)}
                            rows={1}
                            required
                            placeholder='Enter your text here'
                        ></textarea>
                    </div>
                </div>
                <div className='chat-section'>
                    <h3>I'm your Tutor</h3>
                    <div className="chat-container">
                        <div className="chat-messages">
                            <CoachMessage messages={messages} />
                        </div>
                        {loadingMsg && <div>Loading ...</div>}
                        <div className='chat-input-box'>
                            <form>
                                <div className='chat-input-div'>
                                    <textarea
                                        className="chat-input"
                                        value={inputMsg}
                                        onChange={e => setInputMsg(e.target.value)}
                                        rows={1}
                                        onKeyDown={enterPressed}
                                        required
                                        placeholder='ask me anything'
                                    ></textarea>
                                    <button className="chat-send-btn" onClick={handleSend}><BsSend /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Coach