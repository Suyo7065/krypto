// https://eth-goerli.g.alchemy.com/v2/rJYCeOd94B-O3RovkFFZ7yZPMP3xckJJ

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url:
        'https://eth-goerli.g.alchemy.com/v2/rJYCeOd94B-O3RovkFFZ7yZPMP3xckJJ',
      accounts: [
        '79430a9d23d042193f21969b6d7c65041bfb8def06e538d064a15053e3c55e4c',
      ],
    },
  },
}
