import { useReducer } from "react";
import UserContext from './UserContext';

const availableActions = {
  DISPLAY: 'display',
  HIDE: 'hide',
  ADD: 'add',
  REMOVE: 'remove',
  SELECTWALLET: 'selectwallet',
  SELECTCHAIN: 'selectchain',
  ISDATAFETCHED: 'isDataFetched'
}

const availableChains = {
  ETHEREUM: 'eth',
  POLYGON: 'polygon',
  AVALANCHE: 'avalanche',
  ALL_AVAILABLE: 'all',
}

// handles local storage for wallet addresses
const walletLength = () => {
  /* in a try catch as firefox thorws an error  when localStorage doenst exist */
  try {
    //try to retrieve localStorage variable
    const walletAddresses = JSON.parse(localStorage.getItem('walletAddresses'));

    console.log(walletAddresses)

    if (!walletAddresses) {
      localStorage.setItem('walletAddresses', JSON.stringify([]));
      return [];
    }

    //exists in local storage & has no saved addresses
    if (walletAddresses && walletAddresses.length === 0) {
      return [];
    }

    //exists in local s torage & has saved addresses
    if (walletAddresses && walletAddresses.length > 0) {
      //return all addresses in array
      return [...walletAddresses];
    }

    //error caught -> localStorage doenst exist in firefox(during testing)
  } catch (e) {
    //create empty walletAddresses localStorage object
    localStorage.setItem('walletAddresses', JSON.stringify([]));
    return [];
  }
}

// const walletLength = false;
const initialUserState = {
  // wallets: ['0x9b863d76c11b7a74f63fcaa1632198b0bcad93f0','0xa9ac72E3BbD107eC40546Fc1C68c5e40fc7A9DD9', '0x2','0x1','0x1A9EFC7507D3Bb3206cA5baBb4dF9e168Bd5cDEE'],
  //fetch wallets from local storage
  wallets: walletLength(),
  isModalShowing: false,
  selectedWallet: null,
  selectedChain: availableActions.POLYGON,
  isDataFetched: false,
};

const userReducer = (state, action) => {
  switch (action.type) {

    case availableActions.DISPLAY: {
      console.log('display!')
      return {
        wallets: state.wallets,
        isModalShowing: true,
        selectedWallet: state.selectedWallet,
        selectedChain: state.selectedChain,
      };
    }

    case availableActions.HIDE: {
      console.log('hide!')
      return {
        wallets: state.wallets,
        isModalShowing: false,
        selectedWallet: state.selectedWallet,
        selectedChain: state.selectedChain,
      };
    }

    case availableActions.ADD: {
      console.log('add!')
      const updatedWallets = state.wallets
      updatedWallets.push(action.walletAddress);

      //set new added wallet to be the selected wallet
      const updatedSelectedWallet = action.walletAddress;
      return {
        wallets: updatedWallets,
        isModalShowing: state.isModalShowing,
        selectedWallet: updatedSelectedWallet,
        selectedChain: state.selectedChain,
      }
    }

    case availableActions.SELECTWALLET: {
      console.log('Select wallet');
      const updatedSelectedWallet = action.walletAddress;

      return {
        ...state,
        selectedWallet: updatedSelectedWallet,
        selectedChain: state.selectedChain,
      }
    }


    case availableActions.SELECTCHAIN: {
      console.log('Select Chain');
      const updatedChain = action.chainName;
      console.log('new CHAIN = ',action.chainName);

      return {
        ...state,
        selectedChain: updatedChain,
      }
    }


    case availableActions.ISDATAFETCHED: {
      console.log('Is Data Fetched')

      //all fetch requests are complete -> true
      const updatedIsDataFetched = true;

      return {
        ...state,
        isDataFetched: updatedIsDataFetched,
      }
    }

    default:
      return {
        ...state
      };
  }
}

const UserProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    initialUserState
  );

  const showModalHandler = () => {
    dispatchUserAction({ type: availableActions.DISPLAY })
  }

  const hideModalHandler = () => {
    dispatchUserAction({ type: availableActions.HIDE })
  }

  const addWalletHandler = (walletAddress) => {
    dispatchUserAction({ type: availableActions.ADD, walletAddress: walletAddress })
  }

  const selectedWalletHandler = (walletAddress) => {
    dispatchUserAction({ type: availableActions.SELECTWALLET, walletAddress: walletAddress })
  }

  //chain dropdown in menu
  const selectChainHandler = (chainName) => {
    dispatchUserAction({ type: availableActions.SELECTCHAIN, chainName: chainName })
  }

  //sets the isdatafetched state to true
  const isDataFetchedHandler = () => {
    dispatchUserAction({ type: availableActions.ISDATAFETCHED });
  }

  // const removeWalletHandler = (walletAddress) => {
  //   dispatchUserAction({ type: 'ADD', walletAddress: walletAddress })
  // }

  const userContext = {
    wallets: userState.wallets,
    isModalShowing: userState.isModalShowing,
    selectedWallet: userState.selectedWallet,
    isDataFetched: userState.isDataFetched,
    showModal: showModalHandler,
    hideModal: hideModalHandler,
    addWallet: addWalletHandler,
    selectWallet: selectedWalletHandler,
    selectChain : selectChainHandler,
    changeDataRetrievedStatus: isDataFetchedHandler,
  }

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
