// models/note.js

import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }, // Add this line
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
