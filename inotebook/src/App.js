import React, { useState } from "react";
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
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      // @ts-ignore
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router>
          <div className="container">
            <Navbar />
            <Alert alert={alert} />
            <Routes>
              {" "}
              <Route path="/" element={<Home showAlert={showAlert} />} />
            </Routes>
            <Routes>
              {" "}
              <Route path="/about" element={<About />} />
            </Routes>
            <Routes>
              {" "}
              <Route path="/login" element={<Login showAlert={showAlert} />} />
            </Routes>
            <Routes>
              {" "}
              <Route
                path="/signup"
                element={<SignUp showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
<Login />;
