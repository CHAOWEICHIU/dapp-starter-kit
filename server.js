const express = require('express')
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const next = require('next')

const MyGraphQLSchema = require('./lib/schema')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())

  // Server-side


  server.use('/graphql', graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  }))


  server.get('/game/:id', (req, res) => {
    if (req.params.id === 'list' || !req.params.id) {
      return app.render(req, res, '/game/list', req.params)
    }
    return app.render(req, res, '/game', req.params)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  /* eslint-disable no-console */
  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log('Server ready on http://localhost:3000');
  })
})
