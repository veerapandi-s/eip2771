const mnemonic = 'wild render law slight strike seven close damp glory jaguar dawn scan';
const kovanUrl = "https://kovan.infura.io/v3/c3422181d0594697a38defe7706a1e5b";
const HDWalletProvider = require("@truffle/hdwallet-provider");

const rinkebeyUrl = "https://rinkeby.infura.io/v3/66b8e081633b4153b9e2600b8e607697";
const mumbaiURL = "https://matic-mumbai.chainstacklabs.com";
const mumbaiPrivatekey = "464c35a6fa516634fa9d3d5da6fb5724f1e69e6acd832af22b53c7dfe3b921af";
const testPrivateKey = "e651d74ad150e5bf7b5360131530f1e527200f7336d9c6e8e2d49f4cfde6c4e0";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(testPrivateKey, rinkebeyUrl);
      },
      gas: 4500000,
      gasPrice: 10000000000,
      network_id: '4',
    },
    mumbai: {
      provider: function() {
        return new HDWalletProvider(mumbaiPrivatekey, mumbaiURL);
      },
      gas: 4500000,
      gasPrice: 10000000000,
      network_id: '80001',
    },
  },
  
  compilers: {
    solc: {
      version: "0.8.0"
   }
 }
};
