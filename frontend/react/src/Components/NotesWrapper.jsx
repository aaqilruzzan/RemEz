import React, { useState } from "react";
import './Notes.module.css';
import { Notes } from "./Notes";
import { NotesForm } from "./NotesForm";
import { v4 as uuidv4 } from "uuid"; // Import uuid to generate unique ids for todos
import { NotesEditForm } from "./NotesEditForm";

export const NotesWrapper = () => {
  const [todos, setTodos] = useState([]); // State to hold the list of todos

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), note: todo, completed: false, isEditing: false },
    ]);
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editnote = (note, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, note, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="container"> {/* Apply the container class here */}
      <div className="TodoWrapper">
        <NotesForm addTodo={addTodo} />
        {todos.map((todo) =>
          todo.isEditing ? (
            <NotesEditForm key={todo.id} editTodo={editnote} note={todo} />
          ) : (
            <Notes
              key={todo.id}
              note={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
            />
          )
        )}
      </div>
    </div>
  );
};
