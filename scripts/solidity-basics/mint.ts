import { ethers } from 'hardhat';

async function main() {
  const contractAddress = '0xA457A0F9b6EDbEc66941D7Ed1D4d4834330ABf52';

  const solidityBasicsNFT = await ethers.getContractAt('SolidityBasicsNFT', contractAddress);
  console.log(solidityBasicsNFT);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
