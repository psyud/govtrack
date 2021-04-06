const GovTrack = artifacts.require("GovTrack");
const MockOracle = artifacts.require("MockOracle");


module.exports = function (deployer, network) {
  if(network == 'live'){
    deployer.deploy(GovTrack, "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e")
  }else{
    deployer.deploy(MockOracle)
    .then(function () {
      return deployer.deploy(GovTrack, MockOracle.address);
    });
  }
};