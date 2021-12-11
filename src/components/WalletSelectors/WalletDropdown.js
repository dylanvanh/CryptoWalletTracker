import { Fragment } from "react";

const WalletDropdown = () => {
  return (
    <Fragment>
      <label for="membership">Select Wallet:</label>
      <select name="wallet" id="wallet">
        <option value="1">Wallet 1</option>
        <option value="2">Wallet 2</option>
      </select>
    </Fragment>
  );
};

export default WalletDropdown;
