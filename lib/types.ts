export interface Block {
  blockNumber: number;
  hash: string;
  timestamp: number;
  stateRoot: string;
  txnCount: number;
  messageCount: number;
  eventCount: number;
  l1VerificationTxnHash: any;
  status: string;
  prevBlockHash: string;
  nextBlockHash: string;
  confirmations: number;
  sequencerAddress: string;
  timeToCreate: number;
  l1AcceptTime: any;
  gasPrice: string;
  version: string;
}

export interface Transaction {
  status: string;
  type: string;
  blockNumber: number;
  hash: string;
  index: number;
  l1VerificationHash: string;
  classHash: string;
  contractAddress: string;
  timestamp: number;
  actualFee: string;
  actions: string;
  contractAlias: string;
  classAlias: string;
}

export interface Contract {
  address: string;
  blockNumber: number;
  isAccount: boolean;
  isErcToken: boolean;
  isProxy: boolean;
  type: number;
  creationTimestamp: number;
  verifiedTimestamp: any;
  classAlias: any;
  contractAlias: any;
  classHash: string;
  version: string;
  blockHash: string;
  nonce: number;
  tokenName: string;
  tokenSymbol: string;
}

export interface Token {
  address: string;
  type: string;
  Default: string;
  name: string;
  symbol: string;
  decimals: number;
  transfers: string;
  holders: string;
}
