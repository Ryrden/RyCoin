// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RyCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("RyCoin", "RYC") {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }
}
