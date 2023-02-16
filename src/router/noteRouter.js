const express = require('express')
const noteRouter = express.Router()
const Notes = require('../model/notes')

noteRouter.get('/', async (req, res, next) => {
  try {
    let notes = await Notes.find({});
    notes = notes.map(note => ({
      _id: note._id,
      title: note.title,
      body: note.body,
    }))
    res.json(notes);
  } catch (error) {
    next(error)
  }
})

noteRouter.post('/', async (req, res) => {
  try {
    let { title = "", body = "" } = req.body;
    let notes = new Notes({ title, body });
    await notes.save();
    res.status(201).json(notes);
  } catch (error) {
    next(error)
  }
})

noteRouter.put('/', (req, res) => {
  res.send('edit note')
})

noteRouter.delete('/', (req, res) => {
  res.send('delete note')
})

module.exports = noteRouter