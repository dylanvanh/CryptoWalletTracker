
import fetch from 'node-fetch'


const selectedWallet = '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e'

const CHAIN_NAMES = {
  POLYGON: 'polygon',
  ETHEREUM: 'eth',
  AVALANCHE: 'avalanche',
}

const TYPE = {
  NATIVE_TOKEN: 'balance',
  ERC20: 'erc20',
}

//ERC20
const api_call_native = `https://deep-index.moralis.io/api/v2/${selectedWallet}/${TYPE.ERC20}?chain=${CHAIN_NAMES.POLYGON}`
const api_call_native_erc20 = `https://deep-index.moralis.io/api/v2/${selectedWallet}/${TYPE.ERC20}?chain=${CHAIN_NAMES.POLYGON}`


console.log(api_call)

// const ERC20_POLYGON = 'https://deep-index.moralis.io/api/v2/0xACf1222153e2B795Cc35c57C32edD8B8Eae86279/erc20?chain=polygon'
// const ERC20_ETH = 'https://deep-index.moralis.io/api/v2/0xACf1222153e2B795Cc35c57C32edD8B8Eae86279/erc20?chain=eth'
// const ERC20_AVALANCHE = 'https://deep-index.moralis.io/api/v2/0xACf1222153e2B795Cc35c57C32edD8B8Eae86279/erc20?chain=avalanche'

// //NATIVE TOKEN
// const NATIVE = ''
// const NATIVE_POLYGON = 'https://deep-index.moralis.io/api/v2/0x057Ec652A4F150f7FF94f089A38008f49a0DF88e/balance?chain=polygon'
// const NATIVE_ETH = 'https://deep-index.moralis.io/api/v2/0x057Ec652A4F150f7FF94f089A38008f49a0DF88e/balance?chain=eth'
// const NATIVE_AVALANCHE = 'https://deep-index.moralis.io/api/v2/0x057Ec652A4F150f7FF94f089A38008f49a0DF88e/balance?chain=avalanche'

const userAction = async () => {
  const response = await fetch(api_call, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-API-Key': `${process.env.REACT_APP_X_API_KEY}`,
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson

  console.log(myJson)
}


userAction()