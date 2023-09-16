import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <div className="container">
            <Navbar />
            <Alert message="This is inotebook" />
            <Routes>
              {" "}
              <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
              {" "}
              <Route path="/about" element={<About />} />
            </Routes>
            <Routes>
              {" "}
              <Route path="/login" element={<Login />} />
            </Routes>
            <Routes>
              {" "}
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
<Login />;
