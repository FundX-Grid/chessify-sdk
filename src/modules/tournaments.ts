import { StacksClient } from '@jadonamite/stacks-core';

export class TournamentModule {
  constructor(private client: StacksClient) {}

  async register(tournamentId: string): Promise<string> {
    console.log(`Registering for tournament ${tournamentId}`);
    return 'tx-pending';
  }

  async list(): Promise<any[]> {
    return [];
  }
}
