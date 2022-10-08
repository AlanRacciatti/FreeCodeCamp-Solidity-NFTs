import { getContractInstance } from '@utils/contracts';
import { Contract, ContractInterface } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  const CONTRACT_ADDRESS_TOKEN: string = '0x5ECEdc30224D9B3b5EE4C2D7ed17C197cb1d263b';
  const CONTRACT_ADDRESS_NFT: string = '0xda4a7Da4397414C089062cf6256989d2C29E31c9';

  const abiToken: ContractInterface = require('../utils/abi/full-stack-token.json');
  const abiNft: ContractInterface = require('../utils/abi/full-stack-NFT.json');

  const tokenContractInstance: Contract = await getContractInstance(CONTRACT_ADDRESS_TOKEN, abiToken);
  const nftContractInstance: Contract = await getContractInstance(CONTRACT_ADDRESS_NFT, abiNft);

  await tokenContractInstance.mintMeAToken();
  await tokenContractInstance.approve(nftContractInstance.address, ethers.utils.parseEther('1'));
  await nftContractInstance.mintNft();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
