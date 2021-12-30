import { useContext } from 'react';
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import Footer from "./components/FooterBar/Footer";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './store/UserContext';

const App = () => {
  const userCtx = useContext(UserContext);
  return (
    <>
      {userCtx.isModalShowing && <AddWalletModal />}
      <Navbar />
      <Main />
      <Footer />
    </>
  );

};
export default App;
