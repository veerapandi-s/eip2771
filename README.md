# EIP2771 Integration Sample

This sample dapp emits an event with the last account that clicked on the "capture the flag" button.
We will integrate this dapp to work gaslessly with GSN v2. This will allow an externally owned account without ETH to capture the flag by signing a meta transaction.

Integration as GitHub with Polygon, Rinkeby, Mumbai and local

Running Instruction

For Installing Dependency 

yarn

After Installing Dependeny Run Ganache for testing locally

yarn ganache

Now start GSN in Local

npx gsn start

Now start the application by

npm run start