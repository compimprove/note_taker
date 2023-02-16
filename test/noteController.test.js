jest.mock("../src/model/notes")
const Note = require("../src/model/notes");
const noteController = require("../src/router/noteController");

describe('test getAllNote', () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn()
  };
  const next = jest.fn()
  test('getAllNote success', async () => {
    const notes = [{
      _id: "note1",
      title: "title",
      body: "body",
    }, {
      _id: "note2",
      title: "title",
      body: "body",
    }];
    Note.find = jest.fn(() => notes)
    await noteController.getAllNote({}, res, next);
    expect(res.json).toHaveBeenCalledWith(notes)
  })

  test('getAllNote error', async () => {
    Note.find = jest.fn(() => { throw Error('error') });
    await noteController.getAllNote({}, res, next);
    expect(next).toHaveBeenCalledWith(Error('error'))
  })
})

describe('test createNote', () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn()
  };
  const next = jest.fn()
  test('createNote success', async () => {
    await noteController.createNote({
      body: {
        title: "title", body: "body"
      }
    }, res, next);
    expect(Note.prototype.save).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(201)
  })
})

describe('test editNote', () => {
  test('editNote success', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const next = jest.fn()
    Note.findOneAndUpdate = jest.fn(() => ({}));
    await noteController.editNote({
      body: {
        title: "title", body: "body"
      }
    }, res, next);
    expect(res.status).toHaveBeenCalledWith(200)
  });

  test('editNote not found', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const next = jest.fn()
    Note.findOneAndUpdate = jest.fn(() => null);
    await noteController.editNote({
      body: {
        title: "title", body: "body"
      }
    }, res, next);
    expect(res.status).toHaveBeenCalledWith(404)
  });

  test('editNote error', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const next = jest.fn()
    Note.findOneAndUpdate = jest.fn(() => { throw Error() });
    await noteController.editNote({
      body: {
        title: "title", body: "body"
      }
    }, res, next);
    expect(next).toHaveBeenCalled()
  });
})

describe('test deleteNote', () => {
  test('deleteNote success', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const next = jest.fn()
    Note.findOneAndUpdate = jest.fn(() => ({}));
    await noteController.editNote({
      body: {
      }
    }, res, next);
    expect(res.status).toHaveBeenCalledWith(200)
  });

  test('deleteNote not found', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const next = jest.fn()
    Note.findOneAndUpdate = jest.fn(() => null);
    await noteController.editNote({
      body: {
      }
    }, res, next);
    expect(res.status).toHaveBeenCalledWith(404)
  });

  test('deleteNote error', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    const next = jest.fn()
    Note.findOneAndUpdate = jest.fn(() => { throw Error() });
    await noteController.editNote({
      body: {
      }
    }, res, next);
    expect(next).toHaveBeenCalled()
  });
})