# @chessify/sdk

[![npm downloads](https://img.shields.io/npm/dm/@jadonamite/chessify-sdk)](https://www.npmjs.com/package/@jadonamite/chessify-sdk)
[![npm version](https://img.shields.io/npm/v/@jadonamite/chessify-sdk.svg)](https://www.npmjs.com/package/@jadonamite/chessify-sdk)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

> Production-ready TypeScript SDK for Chessify — play chess, place wagers, and join tournaments on the Stacks blockchain.

## 📦 Installation

This SDK requires the `@fundxgrid/stacks-core` utility package.

```bash
npm install @jadonamite/chessify-sdk @jadonamite/stacks-core
```

## 🚀 Quick Start

Initialize the client with your network configuration to interact with the Chessify contracts.

```typescript
import { ChessifyClient } from '@jadonamite/chessify-sdk';

const client = new ChessifyClient({ network: 'mainnet' });

async function run() {
  // Create a game with a wager
  await client.games.create({ opponent: 'SP123...', wager: 10 });

  // Submit a chess move
  await client.games.submitMove('game-id', 'e4');

  // Place a wager on a game
  await client.wagers.place({ gameId: 'game-id', amount: 5, token: 'STX' });
}
```

## 🧩 Architecture

- `client.games` — Create and play games on-chain.
- `client.wagers` — Place and claim wagers securely.
- `client.tournaments` — Register and compete in tournaments.
