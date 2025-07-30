import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('list:index', () => {
  it('runs list:index cmd', async () => {
    const {stdout} = await runCommand('list:index')
    expect(stdout).to.contain('hello world')
  })

  it('runs list:index --name oclif', async () => {
    const {stdout} = await runCommand('list:index --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
