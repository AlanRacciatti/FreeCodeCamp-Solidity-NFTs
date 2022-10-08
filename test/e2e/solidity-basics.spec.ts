import { Contract, ContractInterface } from 'ethers';
import { evm } from '@utils';
import { getNodeUrl } from 'utils/env';
import { getContractInstance } from '@utils/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Solidity basics NFT minting', () => {
  const CONTRACT_ADDRESS: string = '0xA457A0F9b6EDbEc66941D7Ed1D4d4834330ABf52';

  // Get this info at https://arbiscan.io/address/0xA457A0F9b6EDbEc66941D7Ed1D4d4834330ABf52 -> Click to see more -> Input data
  const location: number = 2;
  const newLocation: number = 3;

  const abi: ContractInterface = require('../../utils/abi/solidity-basics.json');

  let bob: SignerWithAddress;

  before(async () => {
    await evm.reset({
      jsonRpcUrl: getNodeUrl('arbitrum'),
      ignoreUnknownTxType: true,
    });

    [bob] = await ethers.getSigners();
  });

  it('Should mint NFT', async () => {
    const contractInstance: Contract = await getContractInstance(CONTRACT_ADDRESS, abi);
    await contractInstance.connect(bob).mintNft(location, newLocation);

    expect(await contractInstance.balanceOf(bob.address)).to.equal(1);
  });
});
