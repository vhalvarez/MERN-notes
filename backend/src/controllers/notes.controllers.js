const notesCtrl = {};

const Note = require('../models/Note');

//Ver todas las notas
notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find(); // [{}, {}, {}]
    res.json(notes);
}

//Crear una nota
notesCtrl.createNote = async (req,res) => {
    const { title, content, date, author} = req.body;
    const newNote = new Note({
        title,
        content,
        date,
        author
    });
    await newNote.save();
    res.json({message: 'Note saved'});
};

//Obtener solo una nota
notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
}

//  Actualizar nota
notesCtrl.updateNote = async (req, res) => {
    const {title,content,author} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {
        title,
        content,
        author
    });
    res.json({message: 'Notas actualizada'});
}


//Borrar notas
notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({message: 'Note deleted'});
};

module.exports = notesCtrl;