import {Args, Command, Flags} from '@oclif/core'

export default class ListIndex extends Command {
  static override description = 'list swaps'
  static override examples = ['<%= config.bin %> <%= command.id %>']
  static override flags = {
    active: Flags.boolean({description: 'list active swaps'}),
  }

  // `./bin/run.js list`

  public async run(): Promise<void> {
    const {flags} = await this.parse(ListIndex)

    this.log(`hello ${name} from /home/pb/fusion-/cli/src/commands/list/index.ts`)
    const offchain = {}

    // Verify offchain integrity
    // offchain.getStatus()

    // TODO
    // offchain.getSwap(flags.active)
  }
}
