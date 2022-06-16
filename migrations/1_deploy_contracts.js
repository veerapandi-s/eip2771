const CaptureTheFlag = artifacts.require('CaptureTheFlag')
const WhitelistPaymaster = artifacts.require('WhitelistPaymaster')
const RelayHub = artifacts.require('RelayHub')


module.exports = async function (deployer) {
  // let forwarder;
  // let relayHubAddress;
  
  if (deployer.network_id == '4') {
    forwarder = "0x83A54884bE4657706785D7309cf46B58FE5f6e8a"; // Rinkeby Forward Address
    relayHubAddress = "0x6650d69225CA31049DB7Bd210aE4671c0B1ca132"; // Rinkeby Relay Hub Address
  } else if(deployer.network_id == '80001') {
    forwarder = "0x4d4581c01A457925410cd3877d17b2fd4553b2C5"; // Mumbai Forward Address
    relayHubAddress = "0x6646cD15d33cE3a6933e36de38990121e8ba2806"; // Mumbai Relay Hub Address
  } else if (deployer.network_id == '137') {
    forwarder = "0xdA78a11FD57aF7be2eDD804840eA7f4c2A38801d"; // Polygon Forward Address
    relayHubAddress = "0x6C28AfC105e65782D9Ea6F2cA68df84C9e7d750d"; // Polygon Relay Hub Address
  }else {
    forwarder = require( '../build/gsn/Forwarder' ).address;
    relayHubAddress = require('../build/gsn/RelayHub.json').address;
  }
  
  // await deployer.deploy(CaptureTheFlag, forwarder)

  // await deployer.deploy(WhitelistPaymaster)
  // const paymaster = await WhitelistPaymaster.deployed()
  // await paymaster.setRelayHub(relayHubAddress)
  // await paymaster.setTrustedForwarder(forwarder)
  // // This is the first ganache address, when started with "ganache-cli -d"
  // await paymaster.whitelistSender('0x1A78b07cF867F4BBb708479C17669a56C8a9a2a3')

  // // to add more addresses to the whitelist, open truffle console and run:
  // // const pm = await WhitelistPaymaster.deployed()
  // // pm.whitelistSender('0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')

  // console.log(`RelayHub(${relayHubAddress}) set on Paymaster(${WhitelistPaymaster.address})`)
  const relayHub = await RelayHub.at(relayHubAddress)
  await relayHub.depositFor(paymaster.address, {value: 0.5e18.toString()})
  console.log(`0.5 ETH deposited to Paymaster(${WhitelistPaymaster.address})`)
}