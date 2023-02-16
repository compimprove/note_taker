const Note = require("../model/notes");

const NoteController = {
  getAllNote: async (req, res, next) => {
    try {
      let notes = await Note.find({});
      notes = notes.map(note => ({
        _id: note._id,
        title: note.title,
        body: note.body,
      }))
      res.json(notes);
    } catch (error) {
      next(error)
    }
  },
  createNote: async (req, res, next) => {
    try {
      let { title = "", body = "" } = req.body;
      let notes = new Note({ title, body });
      await notes.save();
      res.status(201).send();
    } catch (error) {
      next(error)
    }
  },

  editNote: async (req, res, next) => {
    try {
      let { title = "", body = "", _id } = req.body;
      let filter = { _id };
      let savedNote = await Note.findOneAndUpdate(filter, { title, body });
      if (!savedNote) {
        return res.status(404).send();
      }
      res.status(200).send();
    } catch (error) {
      next(error)
    }
  },

  deleteNote: async (req, res, next) => {
    try {
      let { _id } = req.body;
      let filter = { _id };
      let deletedNote = await Note.findOneAndDelete(filter);
      if (!deletedNote) {
        return res.status(404).send();
      }
      res.json({
        _id: deletedNote._id,
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = NoteController;