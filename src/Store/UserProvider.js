import { useReducer } from "react";
import UserContext from './UserContext';


const initialUserState = {
  wallets: [],
  isModalShowing: false,
};


const userReducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAY':
      console.log('display!')
      return {
        wallets: state.wallets,
        isModalShowing: true
      };
    case 'HIDE':
      console.log('hide!')
      return {
        wallets: state.wallets,
        isModalShowing: false
      };
    case 'ADD':
      console.log('ADD!')
      const updatedWallets = state.wallets
      console.log('updatedWallets=', updatedWallets)
      updatedWallets.push(action.walletAddress);
      // console.log('wallet address', action.walletAddress)
      // const updatedWallets = state.wallets;
      // updatedWallets.push(action.walletAddress);
      // state.wallets.concat(action.walletAddress);

      // console.log('wallets after add =', updatedWallets)
      return {
        wallets: updatedWallets,
        isModalShowing: state.isModalShowing,
      }
  }
}
const UserProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    initialUserState
  );

  const showModalHandler = () => {
    dispatchUserAction({ type: 'DISPLAY' })
  }

  const hideModalHandler = () => {
    dispatchUserAction({ type: 'HIDE' })
  }

  const addWalletHandler = (walletAddress) => {
    dispatchUserAction({ type: 'ADD', walletAddress: walletAddress })
  }

  // const removeWalletHandler = (walletAddress) => {
  //   dispatchUserAction({ type: 'ADD', walletAddress: walletAddress })
  // }

  const userContext = {
    wallets: userState.wallets,
    isModalShowing: userState.isModalShowing,
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
