const GovTrack = artifacts.require("GovTrack");

module.exports = function (deployer) {
  deployer.deploy(GovTrack);
};