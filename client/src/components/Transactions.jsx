import React, { useContext } from 'react'
import { TransactionsContext } from '../context/TransactionsContext'
import dummyData from '../utils/dummyData'
import { shortenAddress } from '../utils/shortenAddress'
import useFetch from '../hooks/useFetch'

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  keyword,
  message,
  amount,
  url,
}) => {
  const gifUrl = useFetch({ keyword })
  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
    2xl:min-w-[370px]
    2xl:max-w-[400px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className=" flex flex-col items-center w-full mt-3">
        <div className=" justify-start w-full mb-6 p-2">
          <a
            href={`https://goerli.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener norefferer"
          >
            <p className="text-white text-base">
              {addressFrom ? `From :${shortenAddress(addressFrom)}` : ' '}
            </p>
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noopener norefferer"
          >
            <p className="text-white text-base">
              {addressTo ? `To :${shortenAddress(addressTo)}` : ' '}
            </p>
          </a>
          <p className="text-white text-base"> Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base"> Message :{message}</p>
            </>
          )}
          <img
            src={gifUrl}
            alt="gif"
            className="w-full h-60 rounded-md shadow-lg object-cover "
          />

          <div className="bg-black p-3 px-5 rounded-3xl mt-5 shadow-2xl">
            <p className="text-[#37c7da] font-bold">{timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionsContext)
  return (
    <div className=" flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className=" flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className=" text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className=" text-white text-3xl text-center my-2">
            Connect Your Account to See latest Transactions.
          </h3>
        )}
        <div className=" flex flex-wrap justify-center items-center mt-10">
          {transactions.map((transaction, index) => (
            <TransactionsCard key={index} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Transactions
