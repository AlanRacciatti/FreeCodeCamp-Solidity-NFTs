import { Contract, ContractInterface } from 'ethers';
import { evm } from '@utils';
import { getNodeUrl } from 'utils/env';
import { getContractInstance } from '@utils/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Blockchain basics NFT minting', () => {
  const CONTRACT_ADDRESS: string = '0xaAcb0B62aEB7Db938f12161Da0E45fC3B2B34179';

  const abi: ContractInterface = require('../../utils/abi/blockchain-basics.json');

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
    await contractInstance.connect(bob).mintNft();

    expect(await contractInstance.balanceOf(bob.address)).to.equal(1);
  });
});
