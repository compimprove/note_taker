const express = require('express')
const NoteController = require('./noteController')
const noteRouter = express.Router()

noteRouter.get('/', NoteController.getAllNote)
noteRouter.post('/', NoteController.createNote)
noteRouter.put('/', NoteController.editNote)
noteRouter.delete('/', NoteController.deleteNote)

module.exports = noteRouter