import { useContext } from 'react';
import fetch from 'node-fetch'

import UserContext from '../../context/UserContext';

const userCtx = useContext(UserContext);


//fetches the specified api
const userAction = async () => {
  const response = await fetch('https://deep-index.moralis.io/api/v2/0xACf1222153e2B795Cc35c57C32edD8B8Eae86279/erc20?chain=polygon', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-API-Key': $`{process.env.REACT_APP_X_API_KEY}`,
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson

  console.log(myJson)
}

userAction()
