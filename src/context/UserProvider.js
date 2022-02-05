import { useReducer } from "react";
import useFetch from "../hooks/useFetch";
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
  ETHEREUM: 'ethereum',
  POLYGON: 'polygon',
  AVALANCHE: 'avalanche',
  ALL_AVAILABLE: 'all',
}

// handles local storage for wallet addresses on app launch
const walletStorageHandler = () => {
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

    //exists in locals torage & has saved addresses
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


const initalSelectedWalletHandler = (wallets) => {

  const walletAddresses = JSON.parse(localStorage.getItem('walletAddresses'));

  try {
    const selectedWallet = JSON.parse(localStorage.getItem('selectedWallet'));

    if (!selectedWallet) {
      if (!walletAddresses) {
        localStorage.setItem('selectedWallet', JSON.stringify(''));
        return null;
      }

      localStorage.setItem('selectedWallet', JSON.stringify(walletAddresses[0]));
      return walletAddresses[0];
    }

    if (selectedWallet && selectedWallet !== '') {
      return selectedWallet
    } else {
      return walletAddresses[0]
    }
  } catch (e) {
    localStorage.setItem('selectedWallet', JSON.stringify(''));
    return null;
  }
}


const initialSelectedChainHandler = () => {
  try{
    const selectedChain = JSON.parse(localStorage.getItem('selectedChain'));

    if(!selectedChain){
      localStorage.setItem('selectedChain',JSON.stringify(availableChains.ETHEREUM))
      return availableChains.ETHEREUM;
    }
    return selectedChain;
  }catch(e){
    localStorage.setItem('selectedChain',JSON.stringify(availableChains.ETHEREUM))
    return availableChains.ETHEREUM
  }
}

// const walletLength = false;
const initialUserState = {
  // wallets: ['0x9b863d76c11b7a74f63fcaa1632198b0bcad93f0','0xa9ac72E3BbD107eC40546Fc1C68c5e40fc7A9DD9', '0x2','0x1','0x1A9EFC7507D3Bb3206cA5baBb4dF9e168Bd5cDEE'],
  //fetch wallets from local storage
  wallets: walletStorageHandler(),
  isModalShowing: false,
  selectedWallet: initalSelectedWalletHandler(),
  selectedChain: initialSelectedChainHandler(),
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

      const currentWallets = state.wallets;
      const newWalletAddress = action.walletAddress;

      // //if blank input field
      if (newWalletAddress.length === 0) {
        console.log('blank address entered')
        return {
          ...state,
        }
      }

      if (currentWallets.includes(action.walletAddress)) {
        console.log('wallet already added')
        return {
          ...state,
        }
      }

      currentWallets.push(newWalletAddress);
      localStorage.setItem('walletAddresses',JSON.stringify(currentWallets));
      localStorage.setItem('selectedWallet', JSON.stringify(newWalletAddress));


      return {
        wallets: currentWallets,
        isModalShowing: state.isModalShowing,
        selectedWallet: newWalletAddress,
        selectedChain: state.selectedChain,
      }
    }

    case availableActions.SELECTWALLET: {
      console.log('Select wallet');
      const updatedSelectedWallet = action.walletAddress;

      localStorage.setItem('selectedWallet', JSON.stringify(updatedSelectedWallet));

      return {
        ...state,
        selectedWallet: updatedSelectedWallet,
        selectedChain: state.selectedChain,
      }
    }

    case availableActions.SELECTCHAIN: {
      console.log('Select Chain');
      const updatedChain = action.chainName;
      console.log('new CHAIN = ', action.chainName);

      localStorage.setItem('selectedChain', JSON.stringify(updatedChain));

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
    selectedChain: userState.selectedChain,
    isDataFetched: userState.isDataFetched,
    showModal: showModalHandler,
    hideModal: hideModalHandler,
    addWallet: addWalletHandler,
    selectWallet: selectedWalletHandler,
    selectChain: selectChainHandler,
    changeDataRetrievedStatus: isDataFetchedHandler,
  }

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
