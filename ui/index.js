const ethers = require('ethers')
const { formatEther } = require( 'ethers/lib/utils')

const { RelayProvider } = require('@opengsn/provider');

// const paymasterAddress = require('../build/gsn/Paymaster.json').address;
const contractArtifact = require('../build/contracts/CaptureTheFlag.json');
const contractAbi = contractArtifact.abi

const paymasterArtifact = require('../build/contracts/WhitelistPaymaster.json')
let whitelistPaymasterAddress

let theContract
let provider

async function initContract() {

  if (!window.ethereum) {
    throw new Error('provider not found')
  }
  window.ethereum.on('accountsChanged', () => {
    console.log('acct');
    window.location.reload()
  })
  window.ethereum.on('chainChanged', () => {
    console.log('chainChained');
    window.location.reload()
  })
  const networkId = await window.ethereum.request({method: 'net_version'})

  let paymasterAddress = paymasterArtifact.networks[networkId].address;

  if (networkId == 4) {
    paymasterAddress = "0xc7Ba78068dcDd55a719E9C63C2222696B5dB07DD"; // Whitelist Paymaster (Whitelisted address = "0x1A78b07cF867F4BBb708479C17669a56C8a9a2a3")
  }
  
  
  const gsnProvider = await RelayProvider.newProvider({
    provider : window.ethereum,
    config: {
      paymasterAddress
    }
  }).init();

  provider = new ethers.providers.Web3Provider(gsnProvider)

  const network = await provider.getNetwork()
  const artifactNetwork = contractArtifact.networks[networkId]
  console.log("Network", artifactNetwork, networkId);
  let contractAddress = artifactNetwork.address
  // if (!artifactNetwork)
  //   throw new Error('Can\'t find deployment on network ' + networkId)
  if (networkId == 4) {
     contractAddress = "0xD7b84e2321dD556690c3be33374B736f9B99AE85";
  }
  // const contractAddress = "0xD7b84e2321dD556690c3be33374B736f9B99AE85"; //Rinkeby Capture the flag address
  
  theContract = new ethers.Contract(
    contractAddress, contractAbi, provider.getSigner())

  await listenToEvents()
  return {contractAddress, network}
}

async function contractCall() {
  await window.ethereum.send('eth_requestAccounts')

  const transaction = await theContract.captureTheFlag()
  const hash = transaction.hash
  console.log(`Transaction ${hash} sent`)
  const receipt = await provider.waitForTransaction(hash)
  console.log(`Mined in block: ${receipt.blockNumber}`)
}

let logview

function log(message) {
  message = message.replace(/(0x\w\w\w\w)\w*(\w\w\w\w)\b/g, '<b>$1...$2</b>')
  if (!logview) {
    logview = document.getElementById('logview')
  }
  logview.innerHTML = message + "<br>\n" + logview.innerHTML
}

async function listenToEvents() {

  theContract.on('FlagCaptured', (previousHolder, currentHolder, rawEvent) => {
    log(`Flag Captured from&nbsp;${previousHolder} by&nbsp;${currentHolder}`)
    console.log(`Flag Captured from ${previousHolder} by ${currentHolder}`)
  })
}

window.app = {
  initContract,
  contractCall,
  log
}

