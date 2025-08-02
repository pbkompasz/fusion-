# fusion-

Fusion+ implementation for a two-way Cosmos- to EVM-based blockchain swap.

## Features

- [x] Cross-chain swap between EVM- and Cosmos-based chains
- [x] Partial fills
- [x] Dutch auction implementation on the EVM and Cosmos chain

## How it works

`docker-compose up` spins up the following components:
| Column 1 | Column 2 |
|----------|----------|
| 9000 | EVM chain |
| 9001 | Cosmos chain |
| 9002 | Offchain service |
| 9003 | EVM block explorer |
| 9004 | Cosmos block explorer |
| 9005 | React frontend |

<!-- To deploy to a Cosmos chain run `docker compose up cosmos --deploy`.
To deploy to an EVM chain run `docker compose up evm --deploy`. -->

### Architecture

```
project/
├── 📄 docker-compose.yaml
├── 📄 run.sh
├── 📁 offchain # Offchain components used to facilitate cross-chain communication
├── 📁 evm # EVM implementation of LOC, HTLC, Dutch Auction
├── 📁 cosmos # Cosmos implementation of HTLC, Dutch Auction, etc.
├── 📁 cli # CLI interface to perform cross-chain swaps
└── 📁 frontend # React interface
```
<!-- └── 📁 tests/ # Integration tests, runs all the nodes, explorers, etc. -->

### Frontend interfaces

There are two ways to interact with swap, a cli and a React frontend.

#### Swap

```bash
Create a cross-chain Fusion+ swap

USAGE
  $ cli swap [--type <value>] [--from <value>] [--to <value>] [--sourceCoin <value>] [--targetCoin <value>] [--amount <value>] [--privateKey <value>]

FLAGS
  --amount=<value>
  --from=<value>
  --privateKey=<value>
  --sourceCoin=<value>
  --targetCoin=<value>
  --to=<value>
  --type=<value>        cosmos-evm or evm-cosmos

DESCRIPTION
  Create a cross-chain Fusion+ swap
```

#### List

```bash
List swaps

USAGE
  $ cli list [--active]

FLAGS
  --active  list active swaps

DESCRIPTION
  list swaps

EXAMPLES
  $ cli list
```

#### Status

```bash
Get swap status

USAGE
  $ cli status [SWAP-ID]

ARGUMENTS
  SWAP-ID  Swap id

DESCRIPTION
  Get swap status

```

## Technical Details

The components are broken down into two main parts, onchain and offchain. The onchain parts are further broken down into EVM and Cosmos speicific components.
Every service runs through a docker-compose file.

### Onchain components

#### EVM

The limit order protocol on the EVM side is redeployed.
For the Cosmos chain we had to reimplement it from scratch.

#### Cosmos

The LOP and HTLC logic has been reimplemented in CosmWasm.

### Offchain components

A service that runs swap instances and mocks resolvers(bidding, filling orders, etc.)

<!-- ## Testing

A lot of emphasis was put on creating a comprehensive testing suite. It is a Kurtosis based testing suite that is blockchain agnostic meaning tests are written once for a bridge-design and tested on any blockchain pair.
Swaps are initiated in any chain. -->
