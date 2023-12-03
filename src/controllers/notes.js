const Note = require('../models/note')
const responses = require('../constants/responses')
const apiResponse = require('../helpers/response-helper')

const getNotes = async (req, res) => {
  try {
    /**
     * @todo Write your code here
     */
    const notes = await Note.findAll();
    return apiResponse(res, responses.success.code, 'Notes retrieved successfully', notes);
  } catch (error) {
    return apiResponse(res, responses.error.code, 'Error retrieving notes')
  }
}

const getNote = async (req, res) => {
  try {
    /**
     * @todo Write your code here
     */
    const noteId = req.params.id;
    const note = await Note.findByPk(noteId);
    if (!note) {
      return apiResponse(res, responses.error.code, 'Note not found');
    }
    return apiResponse(res, responses.success.code, 'Note retrieved successfully', note);
  } catch (error) {
    console.error(error);
    return apiResponse(res, responses.error.code, 'Error retrieving note')
  }
}

const createNote = async (req, res) => {
  try {
    /**
     * @todo Write your code here
     */
    const { title, content } = req.body;
    const note = await Note.create({
      'title': title,
      'content': content
    });
    return apiResponse(res, responses.created.code, 'Note created successfully', note);
  } catch (error) {
    return apiResponse(res, responses.error.code, 'Error creating note')
  }
}

const updateNote = async (req, res) => {
  try {
    /**
     * @todo Write your code here
     */
    const noteId = req.params.id; 
    const { title, content } = req.body; 
    const updatedNote = await Note.update(
      {
        'title': title,
        'content': content,
      },{where:{id:noteId}}
    );
    if (!updatedNote) {
      return apiResponse(res, responses.error.code, 'Note not found');
    }

    const note = await Note.findByPk(noteId);

    return apiResponse(res, responses.success.code, 'Note updated successfully', note);
  } catch (error) {
    console.error(error);
    return apiResponse(res, responses.error.code, 'Error updating note')
  }
}

const deleteNote = async (req, res) => {
  try {
    /**
     * @todo Write your code here
     */
    const noteId = req.params.id;
    const note = await Note.destroy({
      where: {
        id: noteId
      }
    });
    if (!note) {
      return apiResponse(res, responses.error.code, 'Note not found');
    }
    return apiResponse(res, responses.success.code, 'Note deleted successfully', {'id':noteId});
  } catch (error) {
    return apiResponse(res, responses.error.code, 'Error deleting note')
  }
}

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
}
