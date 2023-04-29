import React, { useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { CgChevronDown } from 'react-icons/cg'


const QandA = ({ data }) => {
    const [expanded, setExpanded] = useState(new Array(data.length).fill(false))

    const handleToggle = (id) => {
        let cardisps = [...expanded]
        cardisps[id] = cardisps[id] === true ? false : true;
        setExpanded(cardisps)
    }

    const expandAll = () => {
        let cardisps = [...expanded]
        cardisps = cardisps.map(el => true)
        setExpanded(cardisps)
    }

    return (
        <div>
            {data && data.length > 0 &&
                <div className='flash-card-container'>
                    {/* <div>
                        <button onClick={expandAll}>Expand all</button>
                    </div> */}
                    <Accordion allowMultipleExpanded>
                        {data.map((el, id) => (
                            <AccordionItem key={id} expanded={expanded[id].toString()} onClick={() => handleToggle(id)}>
                                <AccordionItemHeading className='accordion-item'>
                                    <AccordionItemButton>
                                        <div className='accordion-div'>
                                            <div>{el.question}</div>
                                            <div className='accordion-icon'><CgChevronDown /></div>
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>
                                        {el.answer}
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>

                </div>
            }
        </div>
    )
}

export default QandA