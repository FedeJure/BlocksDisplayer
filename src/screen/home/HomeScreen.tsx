import React, { useState, useEffect } from "react"
import { Button, Container, Header, Segment } from 'semantic-ui-react'
import SearchInput from "../../components/searchInput/SearchInput"
import BlockList from "../../modules/blockList/BlockList"

const HomeScreen = () => {
    const ethereum = (window as any).ethereum

    const [elements, setElements] = useState([])

    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [connected, setConnected] = useState(false)
    const [currentAccount, setCurrentAccount] = useState("")

    const onSearchChange = (input: string) => {

    }

    const handleMetaMaskConnection = () => {
        ethereum.request({ method: 'eth_requestAccounts' })
            .then((accounts: string[]) => {
                setCurrentAccount(accounts[0])
                setConnected(true)
            })
    }

    useEffect(() => {
        // fetch ten last blocks
        // save to elements
        ethereum.on("accountsChanged", (accounts: string[]) => {
            console.log(accounts)
        })
    }, [])

    return (
        <Container text>
            <Segment>
                <Header as='h2'>Block explorer {!connected && <Button primary onClick={handleMetaMaskConnection}>Connect to MetaMask</Button>}</Header>
                {connected && <span>Connected with account: {currentAccount}</span>}
            </Segment>
            <SearchInput onInputChange={onSearchChange} loading={loading} />
            <Segment><BlockList elements={elements} /></Segment>
        </Container>

    )
}

export default HomeScreen