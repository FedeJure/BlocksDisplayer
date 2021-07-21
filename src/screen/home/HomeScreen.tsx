import React, { useState, useEffect } from "react"
import { Container, Header, Segment } from 'semantic-ui-react'
import SearchInput from "../../components/searchInput/SearchInput"
import BlockList from "../../modules/blockList/BlockList"

const HomeScreen = () => {

    const [elements, setElements] = useState([{
        blockHash: "ewfadsasdfasdgasfdg",
        transactionAmount: 1233,
        sender: "jeghwgqwfadsdxdfgfgh",
        receiver: "fghsfdgdsafadgdsfgd"
    },
    {
        blockHash: "eererwerwer",
        transactionAmount: 1233,
        sender: "jeghwgqwfadsdxdfgfgh",
        receiver: "fghsfdgdsafadgdsfgd"
    },
    {
        blockHash: "fadsasdfasdgasqwerqwerfdg",
        transactionAmount: 1233,
        sender: "jeghwgqwfadsdxdfgfgh",
        receiver: "fghsfdgdsafadgdsfgd"
    }])

    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)

    const onSearchChange = (input: string) => {

    }

    useEffect(() => {
        // fetch ten last blocks
        // save to elements
        console.log((window as any).ethereum)
    }, [])

    return (
        <Container text>
            <Segment><Header as='h2'>Block explorer</Header></Segment>
            <SearchInput onInputChange={onSearchChange} loading={loading} />
            <Segment><BlockList elements={elements} /></Segment>
        </Container>

    )
}

export default HomeScreen