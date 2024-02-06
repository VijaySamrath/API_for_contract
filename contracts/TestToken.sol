// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20{
    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
        
    {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

// CONTRACT_ADDRESS= "0xdEA26f6Ec770059774186bBf2625A9a707a01C4d"


