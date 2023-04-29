import React, { useRef, useState } from 'react'
import useAutosizeTextArea from '../../utils/useAutoTextArea';
import './Chat.css'
import Result from '../Result';

const API_KEY = "";

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
        console.log(parsedData)
        return parsedData;
    }




    const parseResult = (ures) => {
        console.log(ures)
        if (choice === 0) {
            let res = ures.split('*')
            setResult(res.slice(1))
        } else if (choice === 2 || choice === 3) {
            const res = parseText(ures)
            setResult(res)
            console.log(res)
        } else {
            setResult([ures])
        }
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

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json()
        }).then(async (data) => {
            parseResult(data.choices[0].message.content)

            // await chrome.storage.local.set({
            //     [`${tabId}messages`]: JSON.stringify(msgs)
            // })
        })
    }

    const handleSend = async (ch) => {
        setResult([])
        if (inputMsg === '')
            return;
        setChoice(ch)
        setLoadingMsg(true)
        await processMessageChatgpt(ch);
        setLoadingMsg(false)
    }


    return (
        <div >
            <h2>Tiger - Your summarizer</h2>
            <div className='main-container'>
                <div className='user-input-section'>
                    <h3>Enter your text</h3>
                    <div>
                        <textarea
                            className="chat-input"
                            value={inputMsg}
                            onChange={e => setInputMsg(e.target.value)}
                            rows={1}
                            ref={textAreaRef}
                            required
                        ></textarea>
                        <button onClick={() => handleSend(0)}>SUMMARIZE in points</button>
                        <button onClick={() => handleSend(1)}>SUMMARIZE in sentences</button>
                        <button onClick={() => handleSend(2)}>Make QA</button>
                        <button onClick={() => handleSend(3)}>Flashcards</button>
                    </div>
                </div>
                <div className='result-section'>
                    <h3>{resultHeading}</h3>
                    <div className='result'>
                        {loadingMsg && <div>tiger IS THINKING ...</div>}
                        {result && <Result choice={choice} data={result} />}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Chat