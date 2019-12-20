import React from "react";
import { Router } from "@reach/router";
//
import "./App.css";
// comps
import { Home } from "./pages/home";
import { ClueMaker } from "./pages/clueMaker";
import { QRScanner } from "./pages/qrScanner";
import { Clue } from "./pages/clue";

const App = () => {
  return (
    <Router>
      <Home path="/" />
      <ClueMaker path="/clueMaker" />
      <QRScanner path="/qrScanner" />
      <Clue path="clue/:clueId" />
    </Router>
  );
};

export default App;
