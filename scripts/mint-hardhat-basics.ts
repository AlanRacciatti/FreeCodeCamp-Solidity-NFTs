import { getContractInstance } from '@utils/contracts';
import { Contract, ContractInterface } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  const CONTRACT_ADDRESS: string = '0xB29eA9ad260B6DC980513bbA29051570b2115110';
  const abi: ContractInterface = require('../utils/abi/hardhat-basics.json');

  const contractInstance: Contract = await getContractInstance(CONTRACT_ADDRESS, abi);
  const valueAtStorageLocationSevenSevenSeven = await ethers.provider.getStorageAt(contractInstance.address, 777);
  await contractInstance.mintNft(valueAtStorageLocationSevenSevenSeven);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
