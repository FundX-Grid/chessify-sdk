import { StacksClient } from '@fundxgrid/stacks-core';
import { Wager } from '../types';

export class WagerModule {
  constructor(private client: StacksClient) {}

  async place(params: { gameId: string; amount: number; token: 'STX' | 'sBTC' }): Promise<string> {
    console.log(`Placing wager of ${params.amount} ${params.token} on game ${params.gameId}`);
    return 'tx-pending';
  }

  async claim(gameId: string): Promise<string> {
    return 'tx-pending';
  }
}
