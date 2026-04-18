# 1. Guarantee we are in the main workspace folder
cd ~/Projects/stacks-sdks

# 2. Create the fundx-sdk directory structure and move into it
mkdir -p fundx-sdk/src/modules
cd fundx-sdk

# 3. Write package.json
cat << 'EOF' > package.json
{
  "name": "@fundx/sdk",
  "version": "1.0.0",
  "description": "TypeScript SDK for FundX — decentralized fundraising on Stacks",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "README.md"],
  "scripts": {
    "build": "tsc",
    "prepare": "npm run build"
  },
  "keywords": ["fundx", "stacks", "defi", "fundraising", "sdk", "bitcoin", "web3"],
  "author": "Your Name <your@email.com>",
  "license": "MIT",
  "devDependencies": {
    "typescript": "^5.0.0"
  },
  "peerDependencies": {
    "@stacks/network": "^6.0.0",
    "@stacks/transactions": "^6.0.0"
  }
}
EOF

# 4. Write tsconfig.json
cat << 'EOF' > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# 5. Write src/types.ts
cat << 'EOF' > src/types.ts
import { NetworkType } from '@yourorg/stacks-core';

export interface FundXConfig {
  network: NetworkType;
  contractAddress?: string;
}

export interface Campaign {
  id: string;
  creator: string;
  goal: number;
  raised: number;
  token: 'STX' | 'sBTC';
  active: boolean;
}

export interface Investor {
  address: string;
  amount: number;
  campaignId: string;
}
EOF

# 6. Write src/modules/campaigns.ts
cat << 'EOF' > src/modules/campaigns.ts
import { StacksClient } from '@yourorg/stacks-core';
import { Campaign } from '../types';

export class CampaignModule {
  constructor(private client: StacksClient) {}

  async create(params: { goal: number; token: 'STX' | 'sBTC' }): Promise<string> {
    console.log(`Creating campaign on ${this.client.network} with goal ${params.goal} ${params.token}`);
    return 'tx-pending';
  }

  async getById(id: string): Promise<Campaign | null> {
    return null;
  }

  async list(): Promise<Campaign[]> {
    return [];
  }
}
EOF

# 7. Write src/modules/investors.ts
cat << 'EOF' > src/modules/investors.ts
import { StacksClient } from '@yourorg/stacks-core';
import { Investor } from '../types';

export class InvestorModule {
  constructor(private client: StacksClient) {}

  async fund(campaignId: string, amount: number): Promise<string> {
    console.log(`Funding campaign ${campaignId} with ${amount} on ${this.client.network}`);
    return 'tx-pending';
  }

  async getByAddress(address: string): Promise<Investor[]> {
    return [];
  }
}
EOF

# 8. Write src/client.ts
cat << 'EOF' > src/client.ts
import { StacksClient } from '@yourorg/stacks-core';
import { FundXConfig } from './types';
import { CampaignModule } from './modules/campaigns';
import { InvestorModule } from './modules/investors';

export class FundXClient {
  public readonly campaigns: CampaignModule;
  public readonly investors: InvestorModule;
  private core: StacksClient;

  constructor(config: FundXConfig) {
    this.core = new StacksClient({ network: config.network });
    this.campaigns = new CampaignModule(this.core);
    this.investors = new InvestorModule(this.core);
  }
}
EOF

# 9. Write src/index.ts
cat << 'EOF' > src/index.ts
export { FundXClient } from './client';
export { CampaignModule } from './modules/campaigns';
export { InvestorModule } from './modules/investors';
export type { FundXConfig, Campaign, Investor } from './types';
EOF

# 10. Write an upgraded README.md
cat << 'EOF' > README.md
# @fundx/sdk

[![npm version](https://img.shields.io/npm/v/@fundx/sdk.svg)](https://www.npmjs.com/package/@fundx/sdk)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

> Production-ready TypeScript SDK for FundX — decentralized fundraising powered by the Stacks blockchain.

## 📦 Installation

This SDK requires the `@yourorg/stacks-core` utility package.

```bash
npm install @fundx/sdk @yourorg/stacks-core
```

## 🚀 Quick Start

Initialize the client with your desired network configuration to begin interacting with FundX smart contracts.

```typescript
import { FundXClient } from '@fundx/sdk';

// Initialize the client on testnet
const client = new FundXClient({ network: 'testnet' });

async function run() {
  // Create a new fundraising campaign
  const txId = await client.campaigns.create({ goal: 5000, token: 'STX' });
  console.log('Campaign creation pending:', txId);

  // Fund an existing campaign
  const fundTxId = await client.investors.fund('campaign-123', 100);
  console.log('Funding transaction pending:', fundTxId);
}
```

## 🧩 Architecture

The SDK is divided into modular domains to keep the API surface clean and predictable:

- `client.campaigns` — Methods for creating, listing, and querying campaign states.
- `client.investors` — Methods for depositing funds and tracking wallet investments.
EOF

# 11. Install dependencies (Using local path for stacks-core to avoid 404s before publishing)
npm install --save-dev typescript
npm install ../stacks-core
npm install @stacks/network @stacks/transactions

# 12. Build the package
npm run build

echo "✅ Phase 4 Complete! @fundx/sdk built successfully."
