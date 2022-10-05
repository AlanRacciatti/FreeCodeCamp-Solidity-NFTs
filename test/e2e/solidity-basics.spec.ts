import { Contract } from 'ethers';
import { ethers, network } from 'hardhat';
import { evm } from '@utils';
import { getNodeUrl } from 'utils/env';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('Solidity basics NFT minting', () => {
  let stranger: SignerWithAddress;
  let solidityBasicsContract: Contract;

  before(async () => {
    await evm.reset({
      jsonRpcUrl: getNodeUrl('arbitrum'),
      ignoreUnknownTxType: true,
    });

    [stranger] = await ethers.getSigners();
  });

  it('Should impersonate account', async () => {
    const address_to_get = '0x6864dC5998c25Db320D3370A53592E44a246FFf4';
    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [address_to_get],
    });

    const signer = await ethers.provider.getSigner(address_to_get);
    console.log(signer._address);

    const balanceOfSigner = await ethers.provider.getBalance(address_to_get);

    console.log(balanceOfSigner);
  });
});
