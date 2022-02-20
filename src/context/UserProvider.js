import { useReducer } from "react";
import UserContext from "./UserContext";

const availableActions = {
  DISPLAY: "display",
  HIDE: "hide",
  ADD: "add",
  REMOVE: "remove",
  SELECT_WALLET: "selectWallet",
  SELECT_CHAIN: "selectChain",
  SELECT_CURRENCY: "selectCurrency",
  SET_CURRENCY_VALUE: "setCurrencyValue",
};

const availableChains = {
  ETHEREUM: "ethereum",
  POLYGON: "polygon",
  AVALANCHE: "avalanche",
  ALL_AVAILABLE: "all",
};

const availableCurrencies = {
  USD: "USD",
  ZAR: "ZAR",
};

const availableCurrenciesSymbol = {
  USD: "$",
  ZAR: "R",
};

// handles local storage for wallet addresses on app launch
const walletStorageHandler = () => {
  /* in a try catch as firefox thorws an error  when localStorage doenst exist */
  try {
    //try to retrieve localStorage variable
    const walletAddresses = JSON.parse(localStorage.getItem("walletAddresses"));

    if (!walletAddresses) {
      localStorage.setItem("walletAddresses", JSON.stringify([]));
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
    localStorage.setItem("walletAddresses", JSON.stringify([]));
    return [];
  }
};

const initalSelectedWalletHandler = (wallets) => {
  const walletAddresses = JSON.parse(localStorage.getItem("walletAddresses"));

  try {
    const selectedWallet = JSON.parse(localStorage.getItem("selectedWallet"));

    if (!selectedWallet) {
      if (!walletAddresses) {
        localStorage.setItem("selectedWallet", JSON.stringify(""));
        return null;
      }

      localStorage.setItem(
        "selectedWallet",
        JSON.stringify(walletAddresses[0])
      );
      return walletAddresses[0];
    }

    if (selectedWallet && selectedWallet !== "") {
      return selectedWallet;
    } else {
      return walletAddresses[0];
    }
  } catch (e) {
    localStorage.setItem("selectedWallet", JSON.stringify(""));
    return null;
  }
};

const initialSelectedChainHandler = () => {
  try {
    const selectedChain = JSON.parse(localStorage.getItem("selectedChain"));

    if (!selectedChain) {
      localStorage.setItem(
        "selectedChain",
        JSON.stringify(availableChains.ETHEREUM)
      );
      return availableChains.ETHEREUM;
    }
    return selectedChain;
  } catch (e) {
    localStorage.setItem(
      "selectedChain",
      JSON.stringify(availableChains.ETHEREUM)
    );
    return availableChains.ETHEREUM;
  }
};

const initialUserState = {
  // wallets: ['0x9b863d76c11b7a74f63fcaa1632198b0bcad93f0','0xa9ac72E3BbD107eC40546Fc1C68c5e40fc7A9DD9','0x1A9EFC7507D3Bb3206cA5baBb4dF9e168Bd5cDEE'],
  //fetch wallets from local storage
  wallets: walletStorageHandler(),
  isModalShowing: false,
  selectedWallet: initalSelectedWalletHandler(),
  selectedChain: initialSelectedChainHandler(),
  selectedCurrency: availableCurrencies.USA,
  selectedCurrencyValue: 1,
  selectedCurrencySymbol: availableCurrenciesSymbol.USD,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case availableActions.DISPLAY: {
      console.log("display!");
      return {
        wallets: state.wallets,
        isModalShowing: true,
        selectedWallet: state.selectedWallet,
        selectedChain: state.selectedChain,
      };
    }

    case availableActions.HIDE: {
      console.log("hide!");
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
        console.log("blank address entered");
        return {
          ...state,
        };
      }

      const lowerCaseWalletAddresses = currentWallets.map((address) =>
        address.toLowerCase()
      );

      if (
        lowerCaseWalletAddresses.includes(action.walletAddress.toLowerCase())
      ) {
        console.log("wallet already added");
        //switch to the already added wallet
        // availableActions.selectWallet(action.walletAddress)
        return {
          ...state,
          selectedWallet: newWalletAddress,
        };
      }

      currentWallets.push(newWalletAddress);
      localStorage.setItem("walletAddresses", JSON.stringify(currentWallets));
      localStorage.setItem("selectedWallet", JSON.stringify(newWalletAddress));

      return {
        wallets: currentWallets,
        isModalShowing: state.isModalShowing,
        selectedWallet: newWalletAddress,
        selectedChain: state.selectedChain,
      };
    }

    case availableActions.REMOVE: {
      console.log("Remove");
      const walletAddresses = state.wallets;
      const updatedWallets = walletAddresses.filter(
        (wallet) => wallet != action.walletAddress
      );

      console.log(updatedWallets);
      localStorage.setItem("walletAddresses", JSON.stringify(updatedWallets));

      //check if clicked wallet is currently active wallet

      if (action.walletAddress == state.selectedWallet) {
        if (updatedWallets.length == 0) {
          console.log("empty wallet");
          localStorage.setItem("selectedWallet", JSON.stringify(""));

          return {
            wallets: updatedWallets,
            isModalShowing: state.isModalShowing,
            selectedWallet: "",
            selectedChain: state.selectedChain,
          };
        }
        const firstWallet = () => {
          //deleted wallet == the first wallet
          if (action.walletAddress == state.wallets[0]) {
            localStorage.setItem(
              "selectedWallet",
              JSON.stringify(state.wallets[1])
            );
            return state.wallets[1];
          }

          localStorage.setItem(
            "selectedWallet",
            JSON.stringify(state.wallets[0])
          );
          return state.wallets[0];
        };
        return {
          wallets: updatedWallets,
          isModalShowing: state.isModalShowing,
          selectedWallet: firstWallet(),
          selectedChain: state.selectedChain,
        };
      }

      return {
        wallets: updatedWallets,
        isModalShowing: state.isModalShowing,
        selectedWallet: state.selectedWallet,
        selectedChain: state.selectedChain,
      };
    }

    case availableActions.SELECT_WALLET: {
      console.log("Select wallet");
      const updatedSelectedWallet = action.walletAddress;

      localStorage.setItem(
        "selectedWallet",
        JSON.stringify(updatedSelectedWallet)
      );

      return {
        ...state,
        selectedWallet: updatedSelectedWallet,
        selectedChain: state.selectedChain,
      };
    }

    case availableActions.SELECT_CHAIN: {
      console.log("Select Chain");
      const updatedChain = action.chainName;
      console.log("new CHAIN = ", action.chainName);

      localStorage.setItem("selectedChain", JSON.stringify(updatedChain));

      return {
        ...state,
        selectedChain: updatedChain,
      };
    }

    case availableActions.SELECT_CURRENCY:
      const updatedCurrency = action.currencyName;

      // if (updatedCurrency == availableCurrencies.USA) {
      //   const updatedCurrencyValue = 1;
      //   const updatedCurrencySymbol =
      //     availableCurrenciesSymbol[updatedCurrency];

      //   return {
      //     ...state,
      //     selectedCurrency: updatedCurrency,
      //     currencyValue: updatedCurrencyValue,
      //     currencySymbol: updatedCurrencySymbol,
      //   };
      // }

      const updatedCurrencyValue = action.currencyValue;
      const updatedCurrencySymbol = availableCurrenciesSymbol[updatedCurrency];

      return {
        ...state,
        selectedCurrency: updatedCurrency,
        selectedCurrencyValue: updatedCurrencyValue,
        selectedCurrencySymbol: updatedCurrencySymbol,
      };

    default:
      return {
        ...state,
      };
  }
};

const UserProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    initialUserState
  );

  const showModalHandler = () => {
    dispatchUserAction({ type: availableActions.DISPLAY });
  };

  const hideModalHandler = () => {
    dispatchUserAction({ type: availableActions.HIDE });
  };

  const addWalletHandler = (walletAddress) => {
    dispatchUserAction({
      type: availableActions.ADD,
      walletAddress: walletAddress,
    });
  };

  const removeWalletHandler = (walletAddress) => {
    dispatchUserAction({
      type: availableActions.REMOVE,
      walletAddress: walletAddress,
    });
  };

  const selectedWalletHandler = (walletAddress) => {
    dispatchUserAction({
      type: availableActions.SELECT_WALLET,
      walletAddress: walletAddress,
    });
  };

  //chain dropdown in menu
  const selectChainHandler = (chainName) => {
    dispatchUserAction({
      type: availableActions.SELECT_CHAIN,
      chainName: chainName,
    });
  };

  const selectCurrencyHandler = (currencyName, currencyValue) => {
    dispatchUserAction({
      type: availableActions.SELECT_CURRENCY,
      currencyName: currencyName,
      currencyValue: currencyValue,
    });
  };

  const userContext = {
    wallets: userState.wallets,
    isModalShowing: userState.isModalShowing,
    selectedWallet: userState.selectedWallet,
    selectedChain: userState.selectedChain,
    selectedCurrency: userState.selectedCurrency,
    selectedCurrencyValue: userState.selectedCurrencyValue,
    selectedCurrencySymbol: userState.selectedCurrencySymbol,
    showModal: showModalHandler,
    hideModal: hideModalHandler,
    addWallet: addWalletHandler,
    removeWallet: removeWalletHandler,
    selectWallet: selectedWalletHandler,
    selectChain: selectChainHandler,
    selectCurrency: selectCurrencyHandler,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
