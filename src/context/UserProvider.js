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

const initialUserState = {
  wallets: ['0x1', '0x2'],
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
    changeDataRetrievedStatus: isDataFetchedHandler,
  }

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
