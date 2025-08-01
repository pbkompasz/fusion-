import {Args, Command, Flags} from '@oclif/core'

// `./bin/run.js status swap_id`
export default class StatusIndex extends Command {
  static override args = {
    'swap-id': Args.string({description: 'Swap id'}),
  }
  static override description = 'Get swap status'
  static override examples = ['<%= config.bin %> <%= command.id %>']
  static override flags = {}

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(StatusIndex)

    const swapId = args['swap-id']

    const offchain = {}
    
    // Verify offchain integrity

    // const swap = offchain.getSwap();
  }
}
