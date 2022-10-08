import { getContractInstance } from '@utils/contracts';
import { Contract, ContractFactory, ContractInterface } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  const CONTRACT_ADDRESS: string = '0x9E9a4e58dDc9483d241AfC9a028E89BD9b9fa683';
  const abi: ContractInterface = require('../utils/abi/course-completed.json');

  const contractInstance: Contract = await getContractInstance(CONTRACT_ADDRESS, abi);
  const OtherContract: ContractFactory = await ethers.getContractFactory('OtherContract');
  const otherContract: Contract = await OtherContract.deploy();
  await otherContract.deployed();
  await contractInstance.mintNft(otherContract.address, ethers.utils.id('doSomethingAgain()').substring(0, 10));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
