import { NetworkType } from '@fundxgrid/stacks-core';

export interface ChessifyConfig {
  network: NetworkType;
  contractAddress?: string;
}

export interface Game {
  id: string;
  white: string;
  black: string;
  status: 'pending' | 'active' | 'finished';
  winner?: string;
  wager?: number;
}

export interface Wager {
  gameId: string;
  amount: number;
  token: 'STX' | 'sBTC';
  bettor: string;
}
