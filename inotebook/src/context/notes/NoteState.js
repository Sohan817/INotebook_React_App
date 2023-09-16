import React, { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitialization = [];
  const [notes, setNotes] = useState(noteInitialization);
  //Get all Notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZjY0NjExZWQ4ZmQ3NmNkZmRkMzc0In0sImlhdCI6MTY5NDgxMzY1Nn0.acyQfdQ0kVT334rvxybNmxHw9kdBmQ2yDUS1Lj5vG-U",
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  //Add a Notes
  const addNotes = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZjY0NjExZWQ4ZmQ3NmNkZmRkMzc0In0sImlhdCI6MTY5NDgxMzY1Nn0.acyQfdQ0kVT334rvxybNmxHw9kdBmQ2yDUS1Lj5vG-U",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  //update a Notes
  const updateNotes = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZjY0NjExZWQ4ZmQ3NmNkZmRkMzc0In0sImlhdCI6MTY5NDgxMzY1Nn0.acyQfdQ0kVT334rvxybNmxHw9kdBmQ2yDUS1Lj5vG-U",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    const newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      var element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  //Delete a Notes
  const deleteNotes = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZjY0NjExZWQ4ZmQ3NmNkZmRkMzc0In0sImlhdCI6MTY5NDgxMzY1Nn0.acyQfdQ0kVT334rvxybNmxHw9kdBmQ2yDUS1Lj5vG-U",
      },
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNotes, updateNotes, deleteNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
