const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    serverRuntimeConfig: {
        INFURA_KEY: process.env.INFURA_KEY
    },
    publicRuntimeConfig: {
        CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS
    },
  }