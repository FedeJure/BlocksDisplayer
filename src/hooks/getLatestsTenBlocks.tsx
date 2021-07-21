import React, { useState, useEffect } from 'react';

const useGetTenLatestsBlock = ({ web3, account }: { web3: any, account: string }) => {
    const [blocks, setBlocks] = useState<any[]>([]);

    useEffect(() => {
        setNewBatch()
    }, [account])

    useEffect(() => {
        const subscription = web3.eth.subscribe('newBlockHeaders', () => {
            setNewBatch();
        });

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const setNewBatch = () => {
        web3.eth.getBlockNumber()
            .then((latestBlock: any) => {

                const blockNumbers = []
                for (let i = latestBlock; i > latestBlock - Math.min(latestBlock, 10); i--) {
                    blockNumbers.push(i)
                }
                
                const requests = blockNumbers.map(n => web3.eth.getBlock(n,true, (block: any) => {
                    if (block != null)
                    setBlocks([...blocks, block])
                }))

                Promise.all(requests).then(blocks => {
                    setBlocks(blocks)
                })

            })
    }


    return { blocks };
}


export { useGetTenLatestsBlock }