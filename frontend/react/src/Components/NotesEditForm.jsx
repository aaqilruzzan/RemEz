import React, {useState} from 'react'
import './Notes.module.css';

export const NotesEditForm = ({editTodo, note}) => {
    const [value, setValue] = useState(note.note); // Initialize with the current note text

    const handleSubmit = (e) => {
      
        e.preventDefault(); // prevent default action
       
        editTodo(value, note.id); // Call editTodo with the new value and note's id
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <textarea 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          className="todo-input" 
          placeholder='Update Note'
      ></textarea>
      <button type="submit" className='todo-btn'>Update Note</button>
    </form>
  )
}
