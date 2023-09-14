import React, { useContext } from "react";
import NotesItem from "./NotesItem";
import AddNotes from "./AddNotes";
import noteContext from "../context/notes/noteContext";
export default function Notes() {
  const context = useContext(noteContext);
  const { notes } = context;
  return (
    <>
      <AddNotes />
      <div>
        {" "}
        <div className="row">
          <h2>Your Notes</h2>
          {notes.map((note) => {
            return <NotesItem key={note._id} note={note} />;
          })}
        </div>
      </div>
    </>
  );
}
