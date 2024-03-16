import React, {useState} from 'react'
import './Notes.css';

// editing existing notes
export const NotesEditForm = ({editNote, note}) => {
    // Initialize with the current note text
    const [value, setValue] = useState(note.note); 

    //  Handle form submission
    const handleSubmit = (e) => {
      
        e.preventDefault(); // prevent default action
       
        editNote(value, note.id); // Update the note with the new text
      };
  return (
    // Form for editing a note
    <form onSubmit={handleSubmit} className="NoteForm">
      <textarea 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          className="note-input" 
          placeholder='Update Note'
      ></textarea>
      <button type="submit" className='note-btn'>Update Note</button>
    </form>
  )
}
