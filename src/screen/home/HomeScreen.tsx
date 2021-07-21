import React, { useState, useEffect } from "react"
import Web3 from "web3"
import { BigNumber } from "bignumber.js";
import { Button, Container, Header, Segment } from 'semantic-ui-react'
import SearchInput from "../../components/searchInput/SearchInput"
import BlockList, { BlockListElement } from "../../modules/blockList/BlockList"
import { useGetTenLatestsBlock } from "../../hooks/getLatestsTenBlocks"

function getFloat(number: string) : number | null{
    try {
        const value = parseFloat(number)
        return value
    } catch (error) {
        return null
    }
}

const HomeScreen = () => {
    const ethereum = (window as any).ethereum
    const web3 = new Web3(ethereum)

    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [connected, setConnected] = useState(false)
    const [transactions, setTransactions] = useState<BlockListElement[]>([])
    const [currentAccount, setCurrentAccount] = useState<string>("")
    const { blocks } = useGetTenLatestsBlock({ web3, account: currentAccount })

    const onSearchChange = (input: string) => {
        setQuery(input)
    }

    const handleMetaMaskConnection = () => {
        ethereum.request({ method: 'eth_requestAccounts' })
            .then((accounts: string[]) => {
                setCurrentAccount(accounts[0])
                setConnected(true)
            })
    }

    const getFilteredTransactions : () => BlockListElement[] = () => {
        if (query === "") return transactions;
        var filteredTransactions: BlockListElement[] = []
        const filters = query.split(" ")
        filters.forEach(filter => {
                filteredTransactions =filteredTransactions.concat(transactions.filter(t => {
                    var amount = getFloat(filter)
                    return (filter.startsWith("0x") && (t.from.includes(filter) || t.to.includes(filter))) || amount != null && amount == t.value}))            
        })
        return filteredTransactions
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
        const newTransactions: BlockListElement[] = []
        blocks.forEach(block => {
            block.transactions.forEach((transaction: any) => {

                newTransactions.push({ ...transaction, value: Web3.utils.fromWei(transaction.value, 'ether') })
            })
        })
        setTransactions(newTransactions)
    }, [blocks])


    return (
        <Container text>
            <Segment>
                <Header as='h2'>Block explorer {!connected && <Button primary onClick={handleMetaMaskConnection}>Connect to MetaMask</Button>}</Header>
                {connected && <span>Connected with account: {currentAccount}</span>}
            </Segment>

            
            <Segment><SearchInput onInputChange={onSearchChange} loading={loading} /></Segment>
            {connected && <BlockList elements={getFilteredTransactions()} />}
        </Container>

    )
}

export default HomeScreen