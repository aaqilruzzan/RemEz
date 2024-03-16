import React, {useState} from 'react'
import './Notes.css';

//adding new notes
export const NotesForm = ({addNote}) => {
    const [value, setValue] = useState('');  // State to hold input value

    const handleSubmit = (e) => {
      e.preventDefault();
      if (value) {
        addNote(value); // Add the new note if input is not empty
        setValue(''); // Reset input value
      }
    };
  return (
    // Form for adding a new note
    <form onSubmit={handleSubmit} className="NoteForm">
            <textarea 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                className="note-input" 
                placeholder='What is New today?' 
            ></textarea>
            <button type="submit" className='note-btn'>Add Note</button>
    </form>
  )
}
