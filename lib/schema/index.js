const graphql = require('graphql')
const moment = require('moment')
const Web3 = require('web3')
const { networks } = require('../../truffle')
const { div } = require('../../utils/calculation')
const UserInformationType = require('./user')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
} = graphql

const rpcEndpoint = `http://${networks.development.host}:${networks.development.port}`

const web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint))

const {
  utils,
  eth: {
    getBalance,
  },
} = web3

const MetadataType = new GraphQLObjectType({
  name: 'MetadataType',
  fields: {
    timestamp: {
      type: GraphQLString,
      resolve: () => moment().valueOf(),
    },
  },
})

const WalletType = new GraphQLObjectType({
  name: 'WalletType',
  fields: () => ({
    address: { type: GraphQLString },
    balance: {
      type: GraphQLString,
      resolve: ({ address }) => getBalance(address)
        .then(balance => div(balance, utils.unitMap.ether)),
    },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    userInformation: {
      type: UserInformationType,
      resolve: () => ({}),
    },
    wallet: {
      type: WalletType,
      args: {
        address: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, { address }) => ({ address }),
    },
    metadata: {
      type: MetadataType,
      resolve: () => ({}),
    },
  },
})


module.exports = new GraphQLSchema({
  query: RootQuery,
})
