import React, { useState } from "react";
import "./Notes.css";

// editing existing notes
export const NotesEditForm = ({ editNote, task }) => {
  const [value, setValue] = useState(task.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(value, task._id);
  };

  return (
    <form onSubmit={handleSubmit} className="NoteForm">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="note-input"
        placeholder="Update Note"
      ></textarea>
      <button type="submit" className="note-btn">
        Update Note
      </button>
    </form>
  );
};
