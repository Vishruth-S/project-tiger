import React from 'react'
import Flashcards from './Flashcards'
import { BsFillCircleFill } from 'react-icons/bs'
import QandA from './QandA'

const Result = ({ choice, data }) => {
    return (
        <div >
            {console.log("=== data' === ", data)}
            {data && data.length > 0 &&
                <div >
                    {choice === 0 &&
                        <div className='result-container-para'>
                            {data?.map((res, index) => (
                                <div className='result-points-div' ><span><BsFillCircleFill className='result-point' /></span> <p key={index}>{res}</p></div>
                            ))}
                        </div>
                    }
                    {choice === 1 &&
                        <div className='result-container-para'>
                            {data.map((el, id) => (
                                <p key={id}>{el}</p>
                            ))}
                        </div>
                    }
                    {choice === 2 &&
                        <QandA data={data} />
                    }
                    {choice === 3 && <Flashcards data={data} />}
                </div>
            }
        </div >
    )
}

export default Result