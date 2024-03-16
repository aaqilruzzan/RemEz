import React, { useState } from "react";
import './Notes.css';
import { NoteItem } from "./NoteItem";
import { NotesForm } from "./NotesForm";
import { v4 as uuidv4 } from "uuid"; // Import uuid to generate unique ids for notes
import { NotesEditForm } from "./NotesEditForm";

export const NotesWrapper = () => {
  const [notes, setNotes] = useState([]); // State to hold the list of notes
  // Function to add a new note
  const addNote = (noteText) => {
    setNotes([
      ...notes,
      { id: uuidv4(), note: noteText, completed: false, isEditing: false },
    ]);
  };
  // Function to delete a note
  const deleteNote = (id) => setNotes(notes.filter((note) => note.id !== id));
   // Function to toggle the completion status of a note
  const toggleComplete = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };
  // Function to mark a note as being edited
  const editNote = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isEditing: !note.isEditing } : note
      )
    );
  };
  // Function to update an existing note's text
  const updateNote = (noteText, id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, note: noteText, isEditing: !note.isEditing } : note
      )
    );
  };

  return (
    <div className="notes-container"> 
      <div className="NoteWrapper">
        <h1>Add a Note Here!!</h1>
        <NotesForm addNote={addNote} />
        {notes.map((note) =>
          note.isEditing ? (
            <NotesEditForm key={note.id} editNote={updateNote} note={note} />
          ) : (
            <NoteItem
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              editNote={editNote}
              toggleComplete={toggleComplete}
            />
          )
        )}
      </div>
    </div>
  );
};
