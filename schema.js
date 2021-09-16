const { buildSchema } = require('graphql')

const schema = buildSchema(`
    type Stock {
        id: ID
        ticker: String
        cost: String
        value: Int
    }

    input StockInput {
        id: ID
        ticker: String!
        cost: String!
        value: Int!
    }

    type Query {
        getAllStocks: [Stock]
        getStock(id: ID): Stock
    }

    type Mutation {
        createStock(input: StockInput): Stock
    }
`)

module.exports = schema