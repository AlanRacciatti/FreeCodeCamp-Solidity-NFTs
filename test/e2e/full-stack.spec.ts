import { Contract, ContractInterface, Transaction } from 'ethers';
import { evm } from '@utils';
import { getNodeUrl } from 'utils/env';
import { getContractInstance } from '@utils/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Full Stack NFT minting', () => {
  const CONTRACT_ADDRESS_TOKEN: string = '0x5ECEdc30224D9B3b5EE4C2D7ed17C197cb1d263b';
  const CONTRACT_ADDRESS_NFT: string = '0xda4a7Da4397414C089062cf6256989d2C29E31c9';

  const abiToken: ContractInterface = require('../../utils/abi/full-stack-token.json');
  const abiNft: ContractInterface = require('../../utils/abi/full-stack-NFT.json');

  let bob: SignerWithAddress;

  before(async () => {
    await evm.reset({
      jsonRpcUrl: getNodeUrl('arbitrum'),
      ignoreUnknownTxType: true,
    });

    [bob] = await ethers.getSigners();
  });

  it('Should mint NFT', async () => {
    const tokenContractInstance: Contract = await getContractInstance(CONTRACT_ADDRESS_TOKEN, abiToken);
    const nftContractInstance: Contract = await getContractInstance(CONTRACT_ADDRESS_NFT, abiNft);

    await tokenContractInstance.connect(bob).mintMeAToken();
    await tokenContractInstance.connect(bob).approve(nftContractInstance.address, ethers.utils.parseEther('1'));
    await nftContractInstance.connect(bob).mintNft();

    expect(await nftContractInstance.balanceOf(bob.address)).to.equal(1);
  });
});
