import React from "react";
import { Router, Link } from "@reach/router";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <Home path="/" />
      <Clue path="clue/:clueId" />
    </Router>
  );
}

export default App;

const Home = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1>QR Treasure Hunt</h1>
    <Link to="/clue/1234">CLUE 1</Link>
  </header>
);

const Clue = ({ clueId }) => (
  <div>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Clue: {clueId}</h1>
    </header>
  </div>
);
