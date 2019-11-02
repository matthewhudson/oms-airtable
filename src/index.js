#!/usr/bin/env node

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const actions = require('./actions')

app.use(bodyParser.json())

const port = process.env.PORT || 8080

app.get('/list', async (req, res) => {
  const {
    baseId,
    fields = [],
    maxRecords = 1,
    tableName,
    view = 'Grid view'
  } = req.query
  const records = await actions.list({
    baseId,
    fields,
    maxRecords,
    tableName,
    view
  })
  // @TODO: Add appropriate error handling
  res.json(records)
})

app.get('/health', (req, res) => res.send('OK'))

app.listen(port, () =>
  console.log(`Listening on localhost: http://localhost:${port}`)
)
