import { getContractInstance } from '@utils/contracts';
import { Contract, ContractInterface } from 'ethers';

async function main() {
  const CONTRACT_ADDRESS: string = '0xA457A0F9b6EDbEc66941D7Ed1D4d4834330ABf52';
  const abi: ContractInterface = require('../utils/abi/blockchain-basics.json');

  const contractInstance: Contract = await getContractInstance(CONTRACT_ADDRESS, abi);
  await contractInstance.mintNft();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
