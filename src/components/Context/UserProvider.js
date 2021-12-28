import { createContext, useReducer } from 'react';
import UserContext from "./UserContext";

const defaultUserState = {
  trackedWallets: [],
}

const userReducer = (state, action) => {

  //add the entered user address
  if (action.type == 'ADD') {
    if (defaultUserState.trackedWallets.indexOf(action.address) === 1) {
      //wallet address already added and saved in context
      return
    }

    //wallet address not already added
    //add new wallet address to list of addresses
    state.trackedWallets.push(action.address);
  }
}


const UserProvider = (props) => {

  const [userState, dispatchUserAction] = useReducer(userReducer, defaultUserState);

  const addNewTrackedWallet = (address) => {
    dispatchUserAction({ type: 'ADD', address: address });
  }

  //different
  const userContext = {
    items: userState.items,
    addNewTrackedWallet: addNewTrackedWallet,
  }

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider;