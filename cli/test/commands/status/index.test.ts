import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('status:index', () => {
  it('runs status:index cmd', async () => {
    const {stdout} = await runCommand('status:index')
    expect(stdout).to.contain('hello world')
  })

  it('runs status:index --name oclif', async () => {
    const {stdout} = await runCommand('status:index --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
