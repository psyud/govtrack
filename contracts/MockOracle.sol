// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract MockOracle is AggregatorV3Interface {
    uint8 mockDecimals;
    string mockDescription;
    uint256 mockVersion;
    int256 mockAnswer;
    
    constructor() {
        mockDecimals = 0;
        mockDescription = "Two plus two is what?";
        mockVersion = 0;
        mockAnswer = 2000;
    }
    
    function decimals() override external view returns (uint8){
        return mockDecimals;
    }
    
    function description() override external view returns (string memory){
        return mockDescription;
    }
    
    function version() override external view returns (uint256){
        return mockVersion;
    }
    
    // getRoundData and latestRoundData should both raise "No data present"
    // if they do not have data to report, instead of returning unset values
    // which could be misinterpreted as actual reported values.
    function getRoundData(uint80 _roundId) override external view returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    ){
        return (_roundId, mockAnswer, 0, 0, 0);
    }
    
    function latestRoundData() override external view returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    ){
        return (0, mockAnswer, 0, 0, 0);
    }
}