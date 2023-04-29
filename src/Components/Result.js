import React from 'react'

const Result = ({ choice, data }) => {
    return (
        <div>
            {console.log(data)}
            {data && data.length > 0 &&
                <div>
                    {choice === 0 &&
                        <ul>
                            {data?.map((res, index) => (
                                <li key={index}>{res}</li>
                            ))}
                        </ul>
                    }
                    {choice === 1 &&
                        data.map((el, id) => (
                            <p key={id}>{el}</p>
                        ))
                    }
                    {choice === 2 &&
                        <ul>
                            {data?.map((res, index) => (
                                <li key={index}>
                                    <p>Question: {res.question}</p>
                                    <p>Answer: {res.answer}</p>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            }
        </div >
    )
}

export default Result