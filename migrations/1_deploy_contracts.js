const CaptureTheFlag = artifacts.require('CaptureTheFlag')
const WhitelistPaymaster = artifacts.require('WhitelistPaymaster')
const RelayHub = artifacts.require('RelayHub')


module.exports = async function (deployer) {
  let forwarder;
  let relayHubAddress;
  
  if (deployer.network_id == '4') {
    forwarder = "0x83A54884bE4657706785D7309cf46B58FE5f6e8a";
    relayHubAddress = "0x6650d69225CA31049DB7Bd210aE4671c0B1ca132"; // Rinkeby Relay Hub Address
  } else {
    forwarder = require( '../build/gsn/Forwarder' ).address;
    relayHubAddress = require('../build/gsn/RelayHub.json').address;
  }
  
  // const forwarder = "0x83A54884bE4657706785D7309cf46B58FE5f6e8a"; // Rinkeby Forwarder
  await deployer.deploy(CaptureTheFlag, forwarder)

  await deployer.deploy(WhitelistPaymaster)
  const paymaster = await WhitelistPaymaster.deployed()
  await paymaster.setRelayHub(relayHubAddress)
  await paymaster.setTrustedForwarder(forwarder)
  // This is the first ganache address, when started with "ganache-cli -d"
  await paymaster.whitelistSender('0x1A78b07cF867F4BBb708479C17669a56C8a9a2a3')

  // to add more addresses to the whitelist, open truffle console and run:
  // const pm = await WhitelistPaymaster.deployed()
  // pm.whitelistSender('0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')

  console.log(`RelayHub(${relayHubAddress}) set on Paymaster(${WhitelistPaymaster.address})`)
  const relayHub = await RelayHub.at(relayHubAddress)
  await relayHub.depositFor(paymaster.address, {value: 1e18.toString()})
  console.log(`1 ETH deposited to Paymaster(${WhitelistPaymaster.address})`)
}