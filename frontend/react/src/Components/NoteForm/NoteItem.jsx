import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const NoteItem = ({ task, deleteNote, editNote, toggleComplete }) => {
  return (
    <div className="Note">
        <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task._id)}>{task.text}</p>
        <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editNote(task._id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteNote(task._id)} />
        </div>
    </div>
  );
};


