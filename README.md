# Crypto Wallet Tracker

<a href="https://github.com/SparklingWater45/CryptoWalletTrackerstargazers"><img src="https://img.shields.io/github/stars/SparklingWater45/CryptoWalletTracker" alt="Stars Badge"/></a>
<a href="https://github.com/SparklingWater45/CryptoWalletTracker/network/members"><img src="https://img.shields.io/github/forks/SparklingWater45/CryptoWalletTracker" alt="Forks Badge"/></a>
<a href="https://github.com/SparklingWater45/CryptoWalletTracker/pulls"><img src="https://img.shields.io/github/issues-pr/SparklingWater45/CryptoWalletTracker" alt="Pull Requests Badge"/></a>
<a href="https://github.com/SparklingWater45/CryptoWalletTracker/issues"><img src="https://img.shields.io/github/issues/SparklingWater45/CryptoWalletTracker" alt="Issues Badge"/></a>
<a href="https://github.com/SparklingWater45/CryptoWalletTracker/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/SparklingWater45/CryptoWalletTracker?color=2b9348"></a>

---
Gives the user a wallet portfolio view, by allowing them to view all their assets and respective values.
```
https://sparklingwater-crypto-wallet-tracker.netlify.app/
```
 
## Features

- Multiple wallet handling
- Metamask connectivity
- Gas costs per chain in gwei (updated every 10 seconds)
- Currency Switching
- Chain switching
- Total value display
- Combined chain display
- Spam Token display


## Example View
<img src = "./example/examplerandomwallet.png" alt="overview"/>



## Usage

```
yarn install
```

```
Create a .env file -> add required api keys:
REACT_APP_MORALIS_API_KEY=
REACT_APP_ETHERSCAN_API_KEY=
REACT_APP_POLYGONSCAN_API_KEY=
REACT_APP_SNOWTRACE_API_KEY=
REACT_APP_CURRENCY_API_KEY=
```

## Required API keys from providers:

### Token Balances for wallet
<img src="https://moralis.io/wp-content/uploads/2021/01/logo_footer.svg" width="200" alt='moralis'/>

```
https://moralis.io/
```



### Prices of tokens in wallet
<img src="https://static.coingecko.com/s/coingecko-logo-d13d6bcceddbb003f146b33c2f7e8193d72b93bb343d38e392897c3df3e78bdd.png" width="200" alt='coingecko'/>

```
https://www.coingecko.com/
```



### Gas (gwei) cost per chain
<img src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.2" width="200" alt='etherscan'/>
<img src="https://polygonscan.com/images/logo.svg?v=0.0.3" width="200" alt='polygonscan'/>
<img src="https://snowtrace.io/images/logo.svg?v=22.2.3.0" width="200" alt='snowtrace'/>

```
https://etherscan.io/ - ETHEREUM
https://polygonscan.com/ - POLYGON
https://snowtrace.io - AVALANCHE
```

### Currency vs dollar values
<img src="https://freecurrencyapi.net/img/freecurrencyapi-logo-dark.svg" width="200" alt='freecurrencyapi'/>

```
https://freecurrencyapi.net
```
