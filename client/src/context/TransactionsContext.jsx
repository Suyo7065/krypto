import React, { useffect, useState, createContext } from 'react'

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
  return (
    <TransactionsContext.Provider value={{ value: 'test' }}>
      {children}
    </TransactionsContext.Provider>
  )
}
