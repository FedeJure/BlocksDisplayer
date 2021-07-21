import React, { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

const BlockList = ({ elements }: { elements: BlockListElement[] }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const handleClick = (index: number) => {
        if (activeIndex === index) setActiveIndex(null)
        else setActiveIndex(index)
    }

    return (
        <div>
            <Accordion fluid styled>
                {elements.map((element, i) => (
                    <div key={element.blockHash}>
                        <Accordion.Title
                            
                            active={activeIndex === i}
                            index={i}
                            onClick={() => handleClick(i)}
                        >
                            <Icon name='dropdown' />
                            {element.blockHash}
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === i}>
                            <p>Sender account: {element.sender}</p>
                            <p>Receiver account: {element.receiver}</p>
                            <p>Amount: {element.transactionAmount} </p>
                        </Accordion.Content>
                    </div>
                ))}
            </Accordion>
        </div>
    )
}

interface BlockListElement {
    blockHash: string,
    transactionAmount: number,
    sender: string,
    receiver: string
}

export default BlockList