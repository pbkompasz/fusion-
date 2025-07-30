import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('swap:index', () => {
  it('runs swap:index cmd', async () => {
    const {stdout} = await runCommand('swap:index')
    expect(stdout).to.contain('hello world')
  })

  it('runs swap:index --name oclif', async () => {
    const {stdout} = await runCommand('swap:index --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
