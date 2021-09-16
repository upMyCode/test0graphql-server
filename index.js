const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema  = require('./schema')
const cors = require('cors')

const app = express()
app.use(cors())

const stocks = [
    {
        id: 1,
        ticker: 'SCHD',
        cost: '500$',
        value: 300,
        
    },
    {
        id: 2,
        ticker: 'VOO',
        cost: '400$',
        value: 800,
    },
    {
        id: 3,
        ticker: 'AbbVie',
        cost: '900$',
        value: 1000,
    }
]

const createStock = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }    
}

const root = {
    getAllStocks: () => {
        return stocks
    },
    getStock: ({id}) => {
        return stocks.find(stock => stock.id == id)
    },
    createStock: ({input}) => {
        const stock = createStock(input)
        stocks.push(stock)
        return stock    
    } 
}

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}))

app.listen(5000, console.log('Running GraphQL API server at http://localhost:5000/graphql'))
