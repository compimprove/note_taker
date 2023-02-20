const Note = require("../model/notes");

const noteController = {
  getAllNote: async (req, res, next) => {
    try {
      let notes = await Note.find({});
      notes = notes.map(note => ({
        _id: note._id,
        title: note.title,
        body: note.body,
        createdAt: note.createdAt
      }))
      res.json(notes);
    } catch (error) {
      next(error)
    }
  },
  createNote: async (req, res, next) => {
    try {
      let { title = "", body = "" } = req.body;
      let note = new Note({ title, body });
      await note.save();
      res.json({ _id: note._id });
    } catch (error) {
      next(error)
    }
  },

  editNote: async (req, res, next) => {
    try {
      let { title = "", body = "", _id } = req.body;
      let filter = { _id };
      let savedNote = await Note.findOneAndUpdate(filter, { title, body }, { new: true });
      if (!savedNote) {
        return res.status(404).send();
      }
      res.status(200).json({
        _id: savedNote._id,
        title: savedNote.title,
        body: savedNote.body,
        createdAt: savedNote.createdAt
      });
    } catch (error) {
      next(error)
    }
  },

  deleteNote: async (req, res, next) => {
    try {
      let { noteId } = req.params;
      let filter = { _id: noteId };
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

module.exports = noteController;