import React, { useState , useEffect} from "react";
import './Notes.css';
import { NoteItem } from "./NoteItem";
import { NotesForm } from "./NotesForm";

import { NotesEditForm } from "./NotesEditForm";
import axios from "axios";

export const NotesWrapper = () => {
  const [notes, setNotes] = useState([]); // State to hold the list of notes



  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const addNote = async (note) => {
    try {
      // Make the POST request to save the new note and get the response
      const response = await axios.post(`${API_URL}/notes`, { text: note });
      const savedNote = response.data;
      setNotes(prevNotes => [...prevNotes, { ...savedNote, completed: false, isEditing: false }]);
    } catch (error) {
      console.error("Failed to save note:", error);
    }
};
useEffect(() => {
  const getNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/getnotes`);
      const fetchedNotes = response.data.map(note => ({
        ...note,
        completed: note.completed, // Make sure this line correctly reflects the note's completed status
        isEditing: false,
      }));
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };
  getNotes();
}, []);


  

// Function to delete a note from the UI and the database
const deleteNote = async (_id) => {
  try {
    await axios.delete(`${API_URL}/notes/${_id}`);
    setNotes(notes.filter(note => note._id !== _id));
  } catch (error) {
    console.error("Failed to delete note:", error);
  }
};



   // Function to toggle the completion status of a note
  // Function to toggle the completion status of a note
  // Function to toggle the completion status of a note
  const toggleComplete = async (id) => {
    const noteToToggle = notes.find(note => note._id === id);
    if (!noteToToggle) {
      console.error("Note not found");
      return;
    }
  
    try {
      // Send PUT request to update the note's `completed` status in the backend
      const response = await axios.put(`${API_URL}/notes/${id}`, {
        ...noteToToggle,
        completed: !noteToToggle.completed,
      });
      const updatedNote = response.data;
  
      // Update the frontend state to reflect the change
      setNotes(notes.map(note => 
        note._id === id ? { ...note, completed: updatedNote.completed } : note
      ));
    } catch (error) {
      console.error("Failed to toggle completion status:", error);
    }
  };
  

  

  // Function to mark a note as being edited
  // Function to mark a note as being edited
const editNote = (id) => {
  setNotes(
    notes.map((note) =>
      note._id === id ? { ...note, isEditing: true } : note
    )
  );
};

  // Function to update an existing note's text
  // Function to update an existing note's text
// In NotesWrapper component
const submitEdit = async (newText, id) => {
  try {
    const response = await axios.put(`${API_URL}/notes/${id}`, { text: newText });
    const updatedNote = response.data;

    setNotes(notes.map(note => 
      note._id === id ? { ...note, text: updatedNote.text, isEditing: false } : note
    ));
  } catch (error) {
    console.error("Failed to update note:", error);
  }
};



  return (
    <div className="notes-container"> 
      <div className="NoteWrapper">
        <h1 className="notes-header">Add a Note Here!!</h1>
        <NotesForm addNote={addNote} />
        {notes.map((note) =>
          note.isEditing ? (
            <NotesEditForm key={note._id} editNote={submitEdit} task={note} />
          ) : (
            <NoteItem
              key={note._id}
              task={note}
              deleteNote={deleteNote}
              editNote={editNote} // This function marks the note as being edited
              toggleComplete={toggleComplete}
            />
          )
        )}
      </div>
    </div>
  );
}