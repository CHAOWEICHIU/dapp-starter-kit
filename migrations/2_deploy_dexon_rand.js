/* global artifacts */

const HelloDexonRand = artifacts.require('./HelloDexonRand.sol');

module.exports = deployer => deployer.deploy(HelloDexonRand)
