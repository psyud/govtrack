const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    serverRuntimeConfig: {
        INFURA_KEY: process.env.INFURA_KEY,
        LOCAL: process.env.ENV,
        GANACHE: 'http://0.0.0.0:8545'
    },
    publicRuntimeConfig: {
        CONTRACT_ADDRESS: process.env.ENV === 'local' ? process.env.LOCAL_CONTRACT_ADDRESS : process.env.CONTRACT_ADDRESS,
        SUBGRAPH_API: process.env.ENV === 'local' ? process.env.LOCAL_SUBGRAPH_API: process.env.SUBGRAPH_API,
        ETH_NODE: process.env.ENV === 'local' ? 'http://0.0.0.0:8545' : `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
    },
    typescript: {
        ignoreBuildErrors: true // This is stupid
    }
  }