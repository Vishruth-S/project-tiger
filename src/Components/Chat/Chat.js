import React, { useRef, useState } from 'react'
import useAutosizeTextArea from '../../utils/useAutoTextArea';
import './Chat.css'
import Result from '../Result';
import axios from 'axios'

const Chat = () => {
    const [result, setResult] = useState([])
    const [inputMsg, setInputMsg] = useState("")
    const [choice, setChoice] = useState(-1)
    const [loadingMsg, setLoadingMsg] = useState(false)
    const [resultHeading, setResultHeading] = useState("Result")

    const textAreaRef = useRef(null);
    useAutosizeTextArea(textAreaRef.current, inputMsg);

    // useEffect(() => {
    //     // async function fetchData() {
    //         // getQuestionData()
    //         // getQuestionTitle()
    //         // await chrome.storage.local.get(`${tabId}messages`, result => {
    //         //     if (result[`${tabId}messages`]) {
    //         //         setMessages(JSON.parse(result[`${tabId}messages`]))
    //         //     }
    //         // })
    //     // }
    //     // fetchData()
    //     // eslint-disable-next-line
    // }, [])



    function parseText(text) {
        const lines = text.trim().split('\n');
        const parsedData = [];
        let question = null;
        let answer = null;
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('Question: ')) {
                if (question !== null && answer !== null) {
                    parsedData.push({ question, answer });
                }
                question = trimmedLine.slice('Question: '.length);
            } else if (trimmedLine.startsWith('Answer: ')) {
                answer = trimmedLine.slice('Answer: '.length);
            }
        }
        if (question !== null && answer !== null) {
            parsedData.push({ question, answer });
        }
        return parsedData;
    }

    async function processMessageChatgpt(ch) {
        // const systemMessage = {
        //     role: "system",
        //     content: "Be a summarizer. Try to give answers in concise points if possible"
        // }

        // const userMessage = {
        //     role: "user",
        //     content: inputMsg
        // }
        let systemContent = "I want you to act as a text summarizer. I am preparing for exams and I only want to read the important points. I will give you a text and you have to summarize it. I may also ask you to ask some questions and answers based on the text. Give answers in plain text, not markdown"
        let inputContent = inputMsg
        switch (ch) {
            case 0:
                systemContent += "Give the summary of the text I enter in bullet points. Each bullet point must begin with a '*'"
                inputContent += "\n. Summarize this in bullet points. Each bullet point must begin with a '*'"
                setResultHeading("Important Points")
                break;
            case 1:
                systemContent += "Give the summary of the text I enter in sentences"
                inputContent += "\n. Summarize this in sentences"
                setResultHeading("Summary")
                break;
            case 2:
                systemContent += "Make some questions and answers for the text I enter. The format must be 'Question:' followed by the question and 'Answer:' followed by the answer."
                inputContent += "\n. Make some questions and answers based on the above text. The format must be 'Question:' followed by the question and 'Answer:' followed by the answer."
                setResultHeading("Questions and Answers")
                break;
            case 3:
                systemContent += "Make some short questions and answers for the text I enter. Each answer must not be more than 3 sentences. The format must be 'Question:' followed by the question and 'Answer:' followed by the answer."
                inputContent += "\n. Make some questions and answers based on the above text. The format must be 'Question:' followed by the question and 'Answer:' followed by the answer."
                setResultHeading("Flashcards")
                break;
            case 4:
                systemContent += "Explain this as if I'm a child or I'm new to this"
                inputContent += "\n. Explain this text like I'm a child"
                setResultHeading("Result")
                break;
            default:
                break;
        }


        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: systemContent
            }, {
                role: "user",
                content: inputContent
            }]
        }
        await axios.post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
            headers: {
                "Authorization": "Bearer " + process.env.REACT_APP_API_KEY,
                "Content-Type": "application/json"
            }
        }).then(async (data) => {
            if (data) {
                let ures = data.data.choices[0].message.content
                let parsedResult = []
                if (ch === 0) {
                    let res = ures.split('*').slice(1)
                    parsedResult = res
                } else if (ch === 2 || ch === 3) {
                    const res = parseText(ures)
                    parsedResult = res
                } else {
                    parsedResult = [ures]
                }
                setResult(parsedResult)
            }

            // await chrome.storage.local.set({
            //     [`${tabId}messages`]: JSON.stringify(msgs)
            // })
        }).catch(err => {
            console.log(err)
        })
    }

    const handleSend = async (ch) => {
        setResult([])
        if (inputMsg === '')
            return;
        if (inputMsg.length > 8000) {
            alert("Text must be less than 8000 characters")
            return;
        }
        setChoice(ch)
        setLoadingMsg(true)
        await processMessageChatgpt(ch);
        setLoadingMsg(false)
    }


    return (
        <div >
            <div className='main-container'>
                <div className='user-input-section'>
                    <h3>Enter the stuff you want to learn</h3>
                    <div>
                        <textarea
                            className="chat-input"
                            value={inputMsg}
                            onChange={e => setInputMsg(e.target.value)}
                            rows={1}
                            ref={textAreaRef}
                            required
                            placeholder='Enter your text here'
                        ></textarea>
                        <button onClick={() => handleSend(0)}>Summarize in points</button>
                        <button onClick={() => handleSend(1)}>Summarize in sentences</button>
                        <button onClick={() => handleSend(2)}>Generate Question Bank</button>
                        <button onClick={() => handleSend(3)}>Generate Flashcards</button>
                        <button onClick={() => handleSend(4)}>Explain like I'm a child</button>
                    </div>
                </div>
                <div className='result-section'>
                    <h3>{resultHeading}</h3>
                    {result &&
                        <div className='result'>
                            {loadingMsg && <div>Loading ...</div>}
                            {result && <Result choice={choice} data={result} />}
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default Chat