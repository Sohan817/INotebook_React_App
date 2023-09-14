import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NotesItem from "./NotesItem";
export default function Notes() {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div>
      {" "}
      <div className="row">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NotesItem key={note._id} note={note} />;
        })}
      </div>
    </div>
  );
}
