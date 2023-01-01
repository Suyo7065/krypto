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
  const [transactions, setTransactions] = useState([])
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

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask!!')
      const transactionContract = getEthereumContract()

      const availableTransactions = await transactionContract.getAllTransactions()
      const structuredTransactions = await availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addresFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000,
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }),
      )
      console.log(structuredTransactions)
      setTransactions(structuredTransactions)
    } catch (error) {
      console.log(error)
    }
  }
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask!!')

      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length) {
        setCurrentAccount(accounts[0])
        getAllTransactions()
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

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract()
      const transactionsCount = await transactionContract.getTransactionsCount()

      window.localStorage.setItem('transactionCount', transactionCount)
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
    checkIfTransactionsExist()
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
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
