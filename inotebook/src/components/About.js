import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
export default function About() {
  const a = useContext(noteContext);
  return (
    <>
      <h1>This is About</h1>
    </>
  );
}
