import { createContext } from "react";

const UserContext = createContext({
  wallets: [],
  isModalShowing: false,
  showModal: () => { },
  // hideModal: () => { },
});

export default UserContext;