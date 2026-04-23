import { StacksClient } from '@jadonamite/stacks-core';
import { Game } from '../types';

export class GameModule {
  constructor(private client: StacksClient) {}

  async create(params: { opponent: string; wager?: number }): Promise<string> {
    console.log(`Creating game vs ${params.opponent} on ${this.client.network}`);
    return 'tx-pending';
  }

  async submitMove(gameId: string, move: string): Promise<string> {
    console.log(`Submitting move ${move} for game ${gameId}`);
    return 'tx-pending';
  }

  async getById(id: string): Promise<Game | null> {
    return null;
  }

  async listActive(): Promise<Game[]> {
    return [];
  }
}
