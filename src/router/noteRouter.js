const express = require('express');
const noteController = require('./noteController');
// eslint-disable-next-line new-cap
const noteRouter = express.Router();

noteRouter.get('/', noteController.getAllNote);
noteRouter.post('/', noteController.createNote);
noteRouter.put('/', noteController.editNote);
noteRouter.delete('/:noteId', noteController.deleteNote);

module.exports = noteRouter;
