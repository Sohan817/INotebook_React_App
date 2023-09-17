import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function NotesItem(props) {
  const context = useContext(noteContext);
  const { deleteNotes } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">
              {note.title}{" "}
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteNotes(note._id);
                  props.showAlert("Deleted Successfully", "success");
                }}
              ></i>
              <i
                className="fa-regular fa-pen-to-square mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </h5>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
