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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZjY0NjExZWQ4ZmQ3NmNkZmRkMzc0In0sImlhdCI6MTY5NDUwODg0MX0.LnpyeRmUxavti_VR9UGaUmJqhjI5MxnqpbQJCCLxWdA",
      },
    });
    const json = await response.json();
    console.log(json);
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZjY0NjExZWQ4ZmQ3NmNkZmRkMzc0In0sImlhdCI6MTY5NDUwODg0MX0.LnpyeRmUxavti_VR9UGaUmJqhjI5MxnqpbQJCCLxWdA",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    const note = {
      _id: "6500609bc814c4482bcaff59",
      user: "64ff64611ed8fd76cdfdd374",
      title: title,
      description: description,
      tag: tag,
      date: "2023-09-12T12:59:07.930Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //update a Notes
  const updateNotes = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZjY0NjExZWQ4ZmQ3NmNkZmRkMzc0In0sImlhdCI6MTY5NDUzMDEwNn0.FQtRtPkFdfL1kYZMKJFPhq17R0D9HTyZZplte0lScNA",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      var element = notes[index];
    }
    // @ts-ignore
    if (element._id === id) {
      // @ts-ignore
      element.title = title;
      // @ts-ignore
      element.description = description;
      // @ts-ignore
      element.tag = tag;
    }
  };
  //Delete a Notes
  const deleteNotes = (id) => {
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
