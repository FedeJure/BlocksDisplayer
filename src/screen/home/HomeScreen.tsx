import React, { useState, useEffect } from "react"
import Web3 from "web3"
import { BigNumber } from "bignumber.js";
import { Button, Container, Header, Segment } from 'semantic-ui-react'
import SearchInput from "../../components/searchInput/SearchInput"
import BlockList, {BlockListElement} from "../../modules/blockList/BlockList"
import {useGetTenLatestsBlock} from "../../hooks/getLatestsTenBlocks"

const HomeScreen = () => {
    const ethereum = (window as any).ethereum
    const web3 = new Web3(ethereum)

    const [transactions, setTransactions] = useState<BlockListElement[]>([])

    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [connected, setConnected] = useState(false)
    const [currentAccount, setCurrentAccount] = useState<string>("")
    const {blocks} = useGetTenLatestsBlock({web3, account: currentAccount})

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
            setTransactions([])            
            setCurrentAccount(accounts[0])
        })
    }, [])

    useEffect(() => {
        const newTransactions : BlockListElement[] = []
        blocks.forEach(block => {
            block.transactions.forEach((transaction: any) => {

                newTransactions.push({...transaction, value:  Web3.utils.fromWei(transaction.value, 'ether')})
            })
        })
        console.log(newTransactions)
        setTransactions(newTransactions)
    }, [blocks])


    return (
        <Container text>
            <Segment>
                <Header as='h2'>Block explorer {!connected && <Button primary onClick={handleMetaMaskConnection}>Connect to MetaMask</Button>}</Header>
                {connected && <span>Connected with account: {currentAccount}</span>}
            </Segment>
            <SearchInput onInputChange={onSearchChange} loading={loading} />
            <Segment><BlockList elements={transactions} /></Segment>
        </Container>

    )
}

export default HomeScreen