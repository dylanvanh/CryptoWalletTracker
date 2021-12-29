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
      return { wallets: [], isModalShowing: true };
    case 'HIDE':
      console.log('hide!')
      return { wallets: [], isModalShowing: false };
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

  const userContext = {
    wallets: userState.wallets,
    isModalShowing: userState.isModalShowing,
    showModal: showModalHandler,
    hideModal: hideModalHandler
  }


  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
