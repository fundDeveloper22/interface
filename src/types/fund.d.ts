export interface FundDetails {
  fund: string
  investor: string
}

export interface Fund {
  address: string
  createdAtTimestamp: number
  manager: string
  investorCount: number
  principalUSD: number
  volumeETH: number
  volumeUSD: number
  feeVolumeETH: number
  feeVolumeUSD: number
  tokens: string[]
  symbols: string[]
  tokensVolumeUSD: number[]
  profitUSD: number
  profitRatio: number
}

export interface FundFields {
  id: string
  address: string
  createdAtTimestamp: string
  manager: string
  investorCount: string
  principalUSD: string
  volumeETH: string
  volumeUSD: string
  feeVolumeETH: string
  feeVolumeUSD: string
  tokens: string[]
  symbols: string[]
  tokensVolumeUSD: string[]
  profitUSD: string
  profitRatio: string
}

export interface Investor {
  id: string
  createdAtTimestamp: number
  fund: string
  manager: string
  investor: string
  principalUSD: number
  volumeETH: number
  volumeUSD: number
  tokens: string[]
  symbols: string[]
  tokensVolumeUSD: number[]
  profitUSD: number
  profitRatio: number
}

export interface InvestorFields {
  id: string
  createdAtTimestamp: string
  fund: string
  manager: string
  investor: string
  principalUSD: string
  volumeETH: string
  volumeUSD: string
  tokens: string[]
  symbols: string[]
  tokensVolumeUSD: string[]
  profitUSD: string
  profitRatio: string
}

export interface XXXFund2Snapshot {
  id: string
  timestamp: number
  fundCount: number
  investorCount: number
  totalVolumeETH: number
  totalVolumeUSD: number
}

export interface XXXFund2SnapshotFields {
  id: string
  timestamp: string
  fundCount: string
  investorCount: string
  totalVolumeETH: string
  totalVolumeUSD: string
}

export interface FundSnapshot {
  id: string
  timestamp: number
  fund: string
  manager: string
  investorCount: number
  principalUSD: number
  volumeETH: number
  volumeUSD: number
  feeVolumeETH: number
  feeVolumeUSD: number
  tokens: string[]
  symbols: string[]
  tokensVolumeUSD: number[]
}

export interface FundSnapshotFields {
  id: string
  timestamp: string
  fund: string
  manager: string
  investorCount: string
  principalUSD: string
  volumeETH: string
  volumeUSD: string
  feeVolumeETH: string
  feeVolumeUSD: string
  tokens: string[]
  symbols: string[]
  tokensVolumeUSD: string[]
}

export interface InvestorSnapshot {
  id: string
  timestamp: number
  fund: string
  manager: string
  investor: string
  principalUSD: number
  volumeETH: number
  volumeUSD: number
  tokens: string[]
  symbols: string[]
  tokensVolumeUSD: number[]
}

export interface InvestorSnapshotFields {
  id: string
  timestamp: string
  fund: string
  manager: string
  investor: string
  principalUSD: string
  volumeETH: string
  volumeUSD: string
  tokens: string[]
  symbols: string[]
  tokensVolumeUSD: string[]
}
