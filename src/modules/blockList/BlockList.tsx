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
                    <div key={element.hash}>
                        <Accordion.Title
                            
                            active={activeIndex === i}
                            index={i}
                            onClick={() => handleClick(i)}
                        >
                            <Icon name='dropdown' />
                            {element.hash}
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === i}>
                            <p>Sender account: {element.from}</p>
                            <p>Receiver account: {element.to}</p>
                            <p>Amount: {element.value} </p>
                        </Accordion.Content>
                    </div>
                ))}
            </Accordion>
        </div>
    )
}

export interface BlockListElement {
    hash: string,
    value: number,
    from: string,
    to: string
}

export default BlockList