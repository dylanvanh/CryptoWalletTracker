import React, { createContext } from 'react';

//Context:
//pass data to different components
//without having to pass through children components props


const UserContext = React.createContext({
  trackedWallets: [],
  addNewTrackedWallet: (address) => {},
});

export default UserContext;