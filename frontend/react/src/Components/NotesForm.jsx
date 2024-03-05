import React, {useState} from 'react'
import './Notes.module.css';

export const NotesForm = ({addTodo}) => {
    const [value, setValue] = useState('');  // State to hold input value

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        if (value) {
          
          addTodo(value); // Call addTodo with the input value
          
          setValue(''); // Reset input value
        }
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
            <textarea 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                className="todo-input" 
                placeholder='What is New today?' 
            ></textarea>
            <button type="submit" className='todo-btn'>Add Note</button>
    </form>
  )
}
