import { AiFillPlayCircle } from 'react-icons/ai'
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'
import Loader from './Loader'
import { useContext } from 'react'
import { TransactionsContext } from '../context/TransactionsContext'
import { shortenAddress } from '../utils/shortenAddress'

const commonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

const Input = ({ placeholder, name, type, value, handleChange }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      step="0.0001"
      value={value}
      onChange={(e) => {
        handleChange(e, name)
      }}
      className="my-2 w-full rounded-md p-2 outline-none bg-transparent border-none text-white text-sm white-glassmorphism "
    />
  )
}

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    isLoading,
  } = useContext(TransactionsContext)

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData
    e.preventDefault()

    if (!addressTo && !amount && !keyword && !message) {
      console.log('sanfjab')
      return
    }
    sendTransaction()
  }

  return (
    <div className=" flex w-full justify-center items-center ">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> accross the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the Crypto World .Buy and sell cryptocurrencies easily.
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] "
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet{' '}
              </p>
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10 ">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={commonStyles}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>Etehereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>Web-3.0</div>
            <div className={commonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>BlockChain</div>
          </div>
        </div>

        <div className="  flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10 ">
          <div className="p-3 justify-end items-start felx-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col h-full w-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {currentAccount ? shortenAddress(currentAccount) : 'Address'}
                </p>
                <p className="text-white font-semibold text-sm mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              type="text"
              name="addressTo"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              type="number"
              name="amount"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              type="text"
              name="keyword"
              handleChange={handleChange}
            />
            <Input
              placeholder="Message"
              type="text"
              name="message"
              handleChange={handleChange}
            />
          </div>
          <div className="h-[1px] w-full bg-gray-400 my-2" />

          {isLoading ? (
            <Loader />
          ) : (
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
            >
              Send Now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Welcome
