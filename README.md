# Local development

## Install packages
```
yarn
```

## Spin up local ganache
Install Truffle and Ganache globally
```
yarn global add truffle ganache-cli
```
Start Ganache
```
ganache-cli -h 0.0.0.0
```

## Deploy contract
```
truffle deploy --reset
```
Note down the contract address.

## Spin up local graph node
Go somewhere else and clone the Graph Node
```
git clone https://github.com/graphprotocol/graph-node/
```
Enter Docker directory
```
cd graph-node/docker
```
If you're on Linux, run `./setup.sh`

Spin up the node
```
docker-compose up
```

If you have the following error: `the net version for chain <chain_name> has changed from <block_number> to <block_number> since the last time we ran` or something similiar, delete the `data/postgres` folder.
In `graph-node/docker`, run
```
rm -rf data/postgres
```

## Create subgraph
Create the subgraph
```
yarn sg-create-local
```

## Edit subgraph.yaml
Change `network` to `mainnet`. This is the network name on the Graph node, and it's not the actual mainnet.
Change `source.address` to the address of the contract that has been deployed.

## Deploy subgraph

Deploy the subgraph
```
yarn sg-deploy-local
```
This deploys the subgraph to the local Graph node, which listens to events from Ganache chain and indexes data

## Run local app
```
yarn dev-local
```
