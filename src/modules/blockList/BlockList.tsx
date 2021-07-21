import React, { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

const BlockList = ({ elements }: { elements: BlockListElement[] }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const handleClick = (index: number) => {
        setActiveIndex(index)
    }

    return (
        <div>
            {elements.map((element, i) => (
                <Accordion fluid styled>
                    <Accordion.Title
                        active={activeIndex === i}
                        index={i}
                        onClick={() => handleClick(i)}
                    >
                        <Icon name='dropdown' />
                        {element.blockHash}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <p>Sender account: {element.sender}</p>
                        <p>Receiver account: {element.receiver}</p>
                        <p>Amount: {element.transactionAmount} </p>
                    </Accordion.Content>
                </Accordion>
            ))}
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