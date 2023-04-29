import React, { useState } from 'react'

const Flashcards = ({ data }) => {
    const [cardDisplays, setCardDisplays] = useState(new Array(data.length).fill(0))

    const handleToggle = (id) => {
        let cardisps = [...cardDisplays]
        cardisps[id] = cardisps[id] ^ 1;
        setCardDisplays(cardisps)
    }

    return (
        <div>
            {/* <h2>FlashCards</h2> */}
            {data && data.length > 0 &&
                <div className='flash-card-container'>
                    {data.map((el, id) => (
                        cardDisplays[id] === 0 ?
                            <div className='flash-card-qn' key={id} onClick={() => handleToggle(id)}>
                                <p>{el.question}</p>
                            </div> :
                            <div className='flash-card-ans' key={id} onClick={() => handleToggle(id)}>
                                <p>{el.answer}</p>
                            </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Flashcards