const GovTrack = artifacts.require("GovTrack");
const MockOracle = artifacts.require("MockOracle");
const dotenv = require('dotenv');
dotenv.config();


module.exports = function (deployer) {
  if(process.env.DEV === true){
    deployer.deploy(MockOracle)
    .then(() => deployer.deploy(GovTrack, MockOracle.address));
  }else{
    deployer.deploy(GovTrack, "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e")
  }
  
};