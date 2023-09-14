import React, { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {
  const noteInitialization = [
    {
      _id: "6500604dc814c4482bcaff56",
      user: "64ff64611ed8fd76cdfdd374",
      title: "My Title",
      description: "Wake up early",
      tag: "Personal",
      date: "2023-09-12T12:57:49.410Z",
      __v: 0,
    },
    {
      _id: "6500609bc814c4482bcaff59",
      user: "64ff64611ed8fd76cdfdd374",
      title: "New Notes",
      description: "Access the playlists",
      tag: "youTube",
      date: "2023-09-12T12:59:07.930Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(noteInitialization);
  //Add a Notes
  const addNotes = (title, description, tag) => {
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
  const updateNotes = () => {};
  //Delete a Notes
  const deleteNotes = (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider value={{ notes, addNotes, updateNotes, deleteNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
