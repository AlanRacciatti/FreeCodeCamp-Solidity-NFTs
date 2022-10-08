import { Contract, ContractInterface } from 'ethers';
import { evm } from '@utils';
import { getNodeUrl } from 'utils/env';
import { getContractInstance } from '@utils/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Hardhat basics NFT minting', () => {
  const CONTRACT_ADDRESS: string = '0xB29eA9ad260B6DC980513bbA29051570b2115110';

  const abi: ContractInterface = require('../../utils/abi/hardhat-basics.json');

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
    const valueAtStorageLocationSevenSevenSeven = await ethers.provider.getStorageAt(contractInstance.address, 777);
    await contractInstance.connect(bob).mintNft(valueAtStorageLocationSevenSevenSeven);

    expect(await contractInstance.balanceOf(bob.address)).to.equal(1);
  });
});
