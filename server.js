const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema.js')

const app = express()

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})

