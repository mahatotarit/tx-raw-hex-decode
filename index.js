const ethers = require('ethers');

// Define the function ABI
// const abi = [
//   'function claim(uint256 signature_id, uint256 amount, bytes memory signature)',
// ];
const abi = [
  {
    inputs: [
      { internalType: 'address', name: '_memefiManagement', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'ECDSAInvalidSignature', type: 'error' },
  {
    inputs: [{ internalType: 'uint256', name: 'length', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 's', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
    type: 'error',
  },
  { inputs: [], name: 'InvalidShortString', type: 'error' },
  {
    inputs: [{ internalType: 'string', name: 'str', type: 'string' }],
    name: 'StringTooLong',
    type: 'error',
  },
  { anonymous: false, inputs: [], name: 'EIP712DomainChanged', type: 'event' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newRewardDistributor',
        type: 'address',
      },
    ],
    name: 'NewRewardDistributor',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newSigner',
        type: 'address',
      },
    ],
    name: 'NewSigner',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'payer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'paymentType',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'paymentToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
    ],
    name: 'Payed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'subject',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'nonces',
        type: 'uint256[]',
      },
    ],
    name: 'RewardAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'subject',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardIndexOf',
        type: 'uint256',
      },
    ],
    name: 'RewardWithdraw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'bool', name: 'swapped', type: 'bool' },
    ],
    name: 'TokenSwap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'trader',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'subject',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'keyAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'subjectFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'supply',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardIndexOf',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pendingRewards',
        type: 'uint256',
      },
      { indexed: false, internalType: 'bool', name: 'isBuy', type: 'bool' },
      { indexed: false, internalType: 'bool', name: 'isSwapped', type: 'bool' },
    ],
    name: 'Trade',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'subject', type: 'address' },
      { internalType: 'uint256[]', name: 'amountsToAdd', type: 'uint256[]' },
      {
        internalType: 'uint256[]',
        name: 'amountsToSubject',
        type: 'uint256[]',
      },
      { internalType: 'uint256[]', name: 'nonces', type: 'uint256[]' },
      { internalType: 'bytes[]', name: 'signatures', type: 'bytes[]' },
    ],
    name: 'addRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: 'subjects', type: 'address[]' },
      { internalType: 'uint256[]', name: 'amountsToAdd', type: 'uint256[]' },
      {
        internalType: 'uint256[]',
        name: 'amountsToSubject',
        type: 'uint256[]',
      },
      { internalType: 'uint256[]', name: 'nonces', type: 'uint256[]' },
      { internalType: 'bytes[]', name: 'signatures', type: 'bytes[]' },
    ],
    name: 'addRewardsInBatches',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'keysSubject', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'buyKeys',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'keysSubject', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'address', name: 'paymentToken', type: 'address' },
      { internalType: 'uint256', name: 'paymentAmount', type: 'uint256' },
      { internalType: 'uint256[]', name: 'itemIds', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'itemMaxUsers', type: 'uint256[]' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'buyKeysWithPayment',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'keysSubject', type: 'address' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'calculateReward',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { internalType: 'bytes1', name: 'fields', type: 'bytes1' },
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'version', type: 'string' },
      { internalType: 'uint256', name: 'chainId', type: 'uint256' },
      { internalType: 'address', name: 'verifyingContract', type: 'address' },
      { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
      { internalType: 'uint256[]', name: 'extensions', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ethToMemefiRate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feesDistributor',
    outputs: [
      { internalType: 'contract IFeesDistributor', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'firstKeyPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'keysSubject', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'getBuyPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'keysSubject', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'getBuyPriceAfterFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'supply', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'getPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'keysSubject', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'getSellPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'keysSubject', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'getSellPriceAfterFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isSwapped',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'keysBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'keysSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'memefiManagement',
    outputs: [
      { internalType: 'contract IMemefiManagement', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'memefiToken',
    outputs: [
      { internalType: 'contract IERC20Burnable', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'nonceUsingCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'paymentToken', type: 'address' },
      { internalType: 'uint256', name: 'paymentAmount', type: 'uint256' },
      { internalType: 'uint256[]', name: 'itemIds', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'itemMaxUsers', type: 'uint256[]' },
      { internalType: 'uint256', name: 'paymentType', type: 'uint256' },
      { internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'pay',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'protocolFeePercent',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'revenueFeePercent',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'keysSubject', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'sellKeys',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_protocolFeePercent', type: 'uint256' },
      { internalType: 'uint256', name: '_subjectFeePercent', type: 'uint256' },
      { internalType: 'uint256', name: '_revenueFeePercent', type: 'uint256' },
    ],
    name: 'setFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'subjectFeePercent',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_ethToMemefiRate', type: 'uint256' },
    ],
    name: 'swapToMemefi',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'keySubject', type: 'address' }],
    name: 'withdrawReward',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: 'keySubjects', type: 'address[]' },
    ],
    name: 'withdrawRewards',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

// Extract the data part of the transaction
const dataPartOfTransaction =
  '0x592de11d000000000000000000000000ced271a5c2ed93ba59dce555fdc73e1de3dcad220000000000000000000000000000000000000000000000000000000000000001';

// Decode the function call
const iface = new ethers.utils.Interface(abi);
const decodedData = iface.decodeFunctionData('buyKeys', dataPartOfTransaction);

console.log(decodedData)
console.log(' ');

decodedData.forEach(element => {
    console.log(element.toString());
});
