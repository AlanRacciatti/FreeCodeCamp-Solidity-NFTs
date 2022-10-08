// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import 'hardhat/console.sol';

contract OtherContract {
  uint256 public s_variable = 0;
  uint256 public s_otherVar = 0;
  address private immutable _owner;

  constructor() {
    _owner = msg.sender;
  }

  function getOwner() external view returns (address) {
    return _owner;
  }

  function doSomething() public returns (bool) {
    s_variable = 123;
    return true;
  }

  function doSomethingAgain() public returns (bool) {
    s_otherVar = 2;
    return true;
  }
}
