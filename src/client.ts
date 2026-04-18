import { StacksClient } from '@fundxgrid/stacks-core';
import { ChessifyConfig } from './types';
import { GameModule } from './modules/games';
import { WagerModule } from './modules/wagers';
import { TournamentModule } from './modules/tournaments';

export class ChessifyClient {
  public readonly games: GameModule;
  public readonly wagers: WagerModule;
  public readonly tournaments: TournamentModule;
  private core: StacksClient;

  constructor(config: ChessifyConfig) {
    this.core = new StacksClient({ network: config.network });
    this.games = new GameModule(this.core);
    this.wagers = new WagerModule(this.core);
    this.tournaments = new TournamentModule(this.core);
  }
}
