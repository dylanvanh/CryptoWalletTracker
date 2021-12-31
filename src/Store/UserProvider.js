import { useReducer } from "react";
import UserContext from './UserContext';


const availableActions = {
  DISPLAY: 'DISPLAY',
  HIDE: 'HIDE',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
}

const initialUserState = {
  wallets: [],
  isModalShowing: false,
  selectedWallet: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case availableActions.DISPLAY:
      console.log('display!')
      return {
        wallets: state.wallets,
        isModalShowing: true,
        selectedWallet: state.selectedWallet,
      };
    case availableActions.HIDE:
      console.log('hide!')
      return {
        wallets: state.wallets,
        isModalShowing: false,
        selectedWallet: state.selectedWallet,
      };
    case availableActions.ADD:
      console.log('ADD!')
      const updatedWallets = state.wallets
      updatedWallets.push(action.walletAddress);

      //set new added wallet to be the selected wallet
      const updatedSelectedWallet = action.walletAddress;

      return {
        wallets: updatedWallets,
        isModalShowing: state.isModalShowing,
        selectedWallet: updatedSelectedWallet,
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

  // const removeWalletHandler = (walletAddress) => {
  //   dispatchUserAction({ type: 'ADD', walletAddress: walletAddress })
  // }

  const userContext = {
    wallets: userState.wallets,
    isModalShowing: userState.isModalShowing,
    selectedWallet: userState.selectedWallet,
    showModal: showModalHandler,
    hideModal: hideModalHandler,
    addWallet: addWalletHandler,
  }


  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
