/* global artifacts it contract assert before */
const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
const HelloDexonRand = artifacts.require('./HelloDexonRand.sol')

contract('PlayerBookV2', () => {
  let helloDexonRandContract

  before(async () => {
    const helloDexonRand = await HelloDexonRand.deployed()
    helloDexonRandContract = new web3.eth.Contract(
      helloDexonRand.abi,
      helloDexonRand.address,
    )
  })
  it('init contract', async () => {
    const initNum = await helloDexonRandContract.methods.value().call()
    const num = await helloDexonRandContract.methods.get().call()
    assert.equal(initNum, num, 'should be the same')
  })
})
