import classes from "./ChainGasDisplay.module.css";
import { useEffect, useState } from "react";
import ChainGasItem from "./ChainGasItem";
import Ethereum from "../../../icons/chains/ethereum.svg";
import Polygon from "../../../icons/chains/polygon.svg";
import Avalanche from "../../../icons/chains/avalanche.svg";

const ChainGasDisplay = () => {
  const [ethereumGwei, setEthereumGwei] = useState('');
  const [polygonGwei, setPolygonGwei] = useState('');
  const [avalancheGwei, setAvalancheGwei] = useState('');

  const fetchGasData = async () => {
    
    const ETHEREUM_GWEI_CALL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    const POLYGON_GWEI_CALL = `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.REACT_APP_POLYGONSCAN_API_KEY}`
    const AVALANCHE_GWEI_CALL = `https://gavax.blockscan.com/gasapi.ashx?apikey=key&method=gasoracle`;

    try {
      const responseEthereum = await fetch(ETHEREUM_GWEI_CALL);
      const responsePolygon = await fetch(POLYGON_GWEI_CALL);
      const responseAvalanche = await fetch(AVALANCHE_GWEI_CALL);
      const ethereumData = await responseEthereum.json();
      const polygonData = await responsePolygon.json();
      const avalancheData = await responseAvalanche.json();

      setEthereumGwei(ethereumData['result']['ProposeGasPrice']);
      setPolygonGwei(polygonData['result']['ProposeGasPrice']);
      setAvalancheGwei(avalancheData['result']['ProposeGasPrice']);

    } catch (e) {
      console.log('gas price fetch error = ', e);
    }
  }

  useEffect(() => {
    fetchGasData();
    const interval = setInterval(() => {
      fetchGasData()
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes['gas-stats']}>
      <h2 className={classes.title}>Gas Stats</h2>
      <ChainGasItem chainIcon={Ethereum} gwei={ethereumGwei} />
      <ChainGasItem chainIcon={Polygon} gwei={polygonGwei} />
      <ChainGasItem chainIcon={Avalanche} gwei={avalancheGwei} />
    </div>
  );
};

export default ChainGasDisplay;
