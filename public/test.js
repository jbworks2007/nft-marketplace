var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.pinata.cloud/data/testAuthentication',
  headers: { 
    'Authorization': process.env.PINATA_JWT,
  }
};

const res = await axios(config)

console.log(res.data);