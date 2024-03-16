import React from 'react'
import './Notes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

// displaying individual notes
export const NoteItem = ({note, deleteNote, editNote, toggleComplete}) => {
  return (
    <div className="Note">
        <p className={`${note.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(note.id)}>{note.note}</p>
        <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editNote(note.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteNote(note.id)} />
        </div>
    </div>
  )
}
