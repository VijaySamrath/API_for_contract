// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MyContract {
    uint256 private myNumber;

    function getNumber() public view returns (uint256) {
        return myNumber;
    } 
    
    function setNumber(uint256 _number) public {
        myNumber = _number;
    } 
 }


