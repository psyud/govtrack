const GovTrack = artifacts.require("GovTrack");
const MockOracle = artifacts.require("MockOracle");


module.exports = function (deployer, network) {
  switch(network){
    case 'kovan':
      deployer.deploy(GovTrack, "0x9326BFA02ADD2366b30bacB125260Af641031331");
      break;

    case 'rinkeby':
      deployer.deploy(GovTrack, "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e")
      break;

    default:
      deployer.deploy(MockOracle)
      .then(function () {
        return deployer.deploy(GovTrack, MockOracle.address);
      });
      break;
  }
};