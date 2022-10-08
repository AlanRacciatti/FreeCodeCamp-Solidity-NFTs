import { Contract, ContractFactory, ContractInterface, Transaction } from 'ethers';
import { evm } from '@utils';
import { getNodeUrl } from 'utils/env';
import { getContractInstance } from '@utils/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Course completed NFT minting', () => {
  const CONTRACT_ADDRESS: string = '0x9E9a4e58dDc9483d241AfC9a028E89BD9b9fa683';
  const abi: ContractInterface = require('../../utils/abi/course-completed.json');

  let deployer: SignerWithAddress;

  before(async () => {
    await evm.reset({
      jsonRpcUrl: getNodeUrl('arbitrum'),
      ignoreUnknownTxType: true,
    });

    [deployer] = await ethers.getSigners();
  });

  it('Should mint NFT', async () => {
    const contractInstance: Contract = await getContractInstance(CONTRACT_ADDRESS, abi);
    const OtherContract: ContractFactory = await ethers.getContractFactory('OtherContract');
    const otherContract: Contract = await OtherContract.deploy();
    await otherContract.deployed();
    await contractInstance.mintNft(otherContract.address, ethers.utils.id('doSomethingAgain()').substring(0, 10));

    expect(await contractInstance.balanceOf(deployer.address)).to.equal(1);
  });
});
