import { createContext, useState, useEffect, useContext } from 'react'
import Web3 from 'web3'
import createLotteryContract from '../utils/lotteryContract'

export const appContext = createContext()

export const AppProvider = ({ children }) => {

  //keeping track of the user wallet address
  const [address, setAddress] = useState('')
  const [web3, setWeb3] = useState()
  const [lotteryContract, setLotteryContract] = useState()
  const [lotteryPot, setLotteryPot] = useState()
  const [lotteryPlayers, setLotteryPlayers] = useState()
  const [lastWinner, setLastWinner] = useState()
  const [lotteryId, setLotteryId] = useState()

  //connecting the wallet
  const connectWallet = async () => {
    //check if metamask is installed
    if (typeof window !== 'undefined' && window.ethereum !== 'undefined') {
      try {
        //request wallet connection
        await window.ethereum.request({method:"eth_requestAccounts"})

        //create web3 instance and set to state()
        const web3 =  new Web3(window.ethereum)
        //set web3 instance in react state
        setWeb3(web3)
        //get list of accounts
        const accounts = await web3.eth.getAccounts()
        /* set account 1 to React state */
        setAddress(accounts[0])
        setLotteryContract(createLotteryContract(web3))
        window.ethereum.on('accountsChanged', async () => {
          const accounts = await web3.eth.getAccounts()
          /* set account 1 to React state */
          setAddress(accounts[0])
        })
      } catch (err) {
        console.log(err, 'connect Wallet')
      }
    } else {
      alert("PLease Install MetaMask")
    }
  }

  // Enter Lottery
  const enterLottery = async () => {
    try {
      await lotteryContract.methods.enter().send({
        from:address,
        value: web3.utils.toWei('0.1', 'ether'),
        gas:300000,
        gasPrice:null
      })
    } catch (error) {
      console.log(error)
    }
  }


  return <appContext.Provider value={{connectWallet, address, enterLottery}}>{children}</appContext.Provider>
}

export const useAppContext = () => {
  return useContext(appContext)
}
