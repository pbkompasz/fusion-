import {Args, Command, Flags} from '@oclif/core'

export default class SwapIndex extends Command {
  static override description = 'Create a cross-chain Fusion+ swap'
  static override examples = ['<%= config.bin %> <%= command.id %>']
  static override flags = {
    type: Flags.string({description: 'cosmos-evm or evm-cosmos'}),
    'cosmos-chain-id': Flags.integer({}),
    'evm-chain-id': Flags.integer({}),
    to: Flags.string({}),
    'source-coin': Flags.string({}),
    'target-coin': Flags.string({}),
    amount: Flags.string({}),
    'private-key': Flags.string({}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(SwapIndex)

    const cosmosChain = ''
    const evmChain = ''
    let offchain = {}

    if (!cosmosChain || !evmChain || !offchain) {
      this.error('Missing architecture elements!')
    }

    let type = flags.type

    if (flags.type !== 'cosmos-evm' && flags.type !== 'evm-cosmos') {
      this.log('Wrong type! Using `cosmos-evm`')
      type = flags.type
    }

    const cosmosChainId = flags['cosmos-chain-id']
    const evmChainId = flags['evm-chain-id']
    const to = flags.to
    const sourceCoin = flags['source-coin']
    const targetCoin = flags['target-coin']
    const amount = flags['amount']
    const privateKey = flags['private-key']


    // TODO
    // offchain.setup(cosmosChainId, evmChainId,  sourceCoin, targetCoin)

    // Verify offchain integrity

    // Verify cosmos chain integrity

    // Verify evm chain integrity

    // Generate secret and log it

    // Create signature



    this.log(`hello ${name} from /home/pb/fusion-/cli/src/commands/swap/index.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
