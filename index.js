const ethers = require('ethers');

// Define the function ABI
const abi = [
  'function claim(uint256 signature_id, uint256 amount, bytes memory signature)',
];

// Extract the data part of the transaction
const dataPartOfTransaction =
  '0x5eddd157000000000000000000000000000000000000000000000000289d151ee4e568f4000000000000000000000000000000000000000006765c793fa10079d0000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000411f51c9f05aa4e10f9eed1b2025b936b4c9e703d1fcade9122db3bac3332ca7a90f73271ca2c65ff5e70795d066b6e77e7b0bf383cdedf8fd8e3d982265b995ee0000000000000000000000000000000000000000000000000000000000000000';

// Decode the function call
const iface = new ethers.utils.Interface(abi);
const decodedData = iface.decodeFunctionData('claim', dataPartOfTransaction);


decodedData.forEach(element => {
    console.log(element.toString());
});
