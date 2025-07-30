import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('cancel:index', () => {
  it('runs cancel:index cmd', async () => {
    const {stdout} = await runCommand('cancel:index')
    expect(stdout).to.contain('hello world')
  })

  it('runs cancel:index --name oclif', async () => {
    const {stdout} = await runCommand('cancel:index --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
