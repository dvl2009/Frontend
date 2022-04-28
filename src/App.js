import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home"
import Login from "./Login"
import Search from "./Search";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-body">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/search/:searchTerm" element={<Search />}></Route>
            <Route
              exact
              path="/login"
              element={<Login />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
