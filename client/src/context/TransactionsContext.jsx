import React, { useEffect, useState, createContext } from 'react'

import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../utils/constants'

export const TransactionsContext = createContext()

const { ethereum } = window

const getEthereumContract = () => {
  const provider = new ethereum.providers.web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  )
  console.log({
    provider,
    signer,
    transactionContract,
  })
}

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setCurrentAccount] = useState()
  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert('Please install MetaMask!!')

    const accounts = await ethereum.request({ method: 'eth_accounts' })
    console.log(accounts)
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask!!')

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setCurrentAccount(accounts[0])
    } catch (err) {
      console.log(err)

      throw new Error('No Etheruem Object')
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])
  return (
    <TransactionsContext.Provider value={{ connectWallet }}>
      {children}
    </TransactionsContext.Provider>
  )
}
