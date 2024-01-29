import axios from "axios";

//const address = "0xE47E5dCDE8E14E874D2711e786bB34aE6980BeF8";

const FetchNFTcontract = (address, chainID) => {
    const options = {
    method: 'GET',
    url: `https://deep-index.moralis.io/api/v2/nft/${address}/owners`,
    params: {chain: chainID, format: 'decimal'},
    headers: {accept: 'application/json', 'X-API-Key': 'UF2OaKrDpLjGojhgpojbDUYgh9xZELZF21GyvFJX5laU2jlHMQwlxhF5qBjykaI3'}
    };

    axios
    .request(options)
    .then(function (response) {
        console.log("response :",response.data.result);
        return response.data.result;
    })
    .catch(function (error) {
        console.error(error);
    });
}


const FetchNFTwallet = (address, chainID) => {
const options = {
    method: 'GET',
    url: `https://deep-index.moralis.io/api/v2/${address}/nft`,
    params: {chain: chainID, format: 'decimal'},
    headers: {accept: 'application/json', 'X-API-Key': 'test'}
  };
  
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      return response.data.result;
    })
    .catch(function (error) {
      console.error(error);
    });
}

export {FetchNFTcontract, FetchNFTwallet};