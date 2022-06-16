var mnemonic = 'wild render law slight strike seven close damp glory jaguar dawn scan';
var kovanUrl = "https://kovan.infura.io/v3/c3422181d0594697a38defe7706a1e5b";
const HDWalletProvider = require("@truffle/hdwallet-provider");

var rinkebeyUrl = "https://rinkeby.infura.io/v3/66b8e081633b4153b9e2600b8e607697";

var testPrivateKey = "e651d74ad150e5bf7b5360131530f1e527200f7336d9c6e8e2d49f4cfde6c4e0";

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
  },
  compilers: {
    solc: {
      version: "0.8.0"
   }
 }
};
