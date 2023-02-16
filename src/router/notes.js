const express = require('express')
const noteRouter = express.Router()

noteRouter.get('/', (req, res) => {
  res.json(['All notes'])
})

noteRouter.post('/', (req, res) => {
  res.send('create note')
})

noteRouter.put('/', (req, res) => {
  res.send('edit note')
})

noteRouter.delete('/', (req, res) => {
  res.send('delete note')
})

module.exports = noteRouter