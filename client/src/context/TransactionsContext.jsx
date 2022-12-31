import React, { useEffect, useState, createContext } from 'react'

import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../utils/constants'

export const TransactionsContext = createContext()

const { ethereum } = window

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  )
  return transactionContract
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState()
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
  })
  const [isLoading, setisLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount'),
  )
  const handleChange = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }))
  }
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask!!')

      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length) {
        setCurrentAccount(accounts[0])
      } else {
        console.log('NO Accounts Found')
      }
    } catch (err) {
      console.log(err)

      throw new Error('No Etheruem Object')
    }
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

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask!!')

      const { addressTo, amount, keyword, message } = formData
      const transactionContract = getEthereumContract()

      const parsedAmount = ethers.utils.parseEther(amount)
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208',
            value: parsedAmount._hex,
          },
        ],
      })

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword,
      )
      setisLoading(true)
      console.log(`Loading  = ${transactionHash.hash}`)
      await transactionHash.wait()
      setisLoading(false)
      console.log(`Success  = ${transactionHash.hash}`)

      const transactionsCount = await transactionContract.getTransactionsCount()
      setTransactionCount(transactionsCount.toNumber())
    } catch (err) {
      console.log(err)

      throw new Error('No Etheruem Object')
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])
  return (
    <TransactionsContext.Provider
      value={{
        formData,
        setFormData,
        connectWallet,
        currentAccount,
        sendTransaction,
        handleChange,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
