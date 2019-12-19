import React, { useState } from "react";
import { Router, Link } from "@reach/router";
import styled from "styled-components";
import QrReader from "react-qr-reader";
// import Cryptr from "cryptr";
import QRCode from "qrcode.react";
import "@material/textfield/dist/mdc.textfield.css";
import "@material/floating-label/dist/mdc.floating-label.css";
import "@material/notched-outline/dist/mdc.notched-outline.css";
import "@material/line-ripple/dist/mdc.line-ripple.css";
import { TextField } from "@rmwc/textfield";
//
import logo from "./logo.svg";
import "./App.css";

const key = "real secret keys should be long and random";
const baseClueUrl = "https://qr-treasure-hunt.netlify.com/clue/";

function App() {
  return (
    <Router>
      <Home path="/" />
      <Clue path="clue/:clueId" />
    </Router>
  );
}

export default App;

const Home = () => {
  const [result, setResult] = useState(null);
  const [clue, setClue] = useState(" ");

  const myCipher = cipher("mySecretThingsWotIWroted");
  const scrambledClue = myCipher(clue);
  const clueUrl = baseClueUrl + scrambledClue;

  const myDecipher = decipher("mySecretThingsWotIWroted");
  const unscrambledClue = myDecipher(scrambledClue);

  const handleScan = data => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = err => {
    console.error(err);
  };

  const onClueTextChange = e => {
    setClue(e.target.value);
  };

  return (
    <div>
      <h1>QR Treasure Hunt</h1>

      <p>clue: {clue}</p>
      <p>scrambledClue: {scrambledClue}</p>
      <p>unscrambledClue: {unscrambledClue}</p>
      <p>clueUrl: {clueUrl}</p>

      <TextField outlined label={clue} onChange={onClueTextChange} />

      <QRCode size={300} value={clueUrl} />

      <Link to="/clue/1234">CLUE 1</Link>

      <div>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
        <p>{result}</p>
      </div>
    </div>
  );
};

const Clue = ({ clueId }) => (
  <div>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Clue: {clueId}</h1>
      <p>
        Go to the toilet and let it rain. Wait, no, not like that you dirty boys
      </p>
    </header>
  </div>
);

const cipher = salt => {
  const textToChars = text => text.split("").map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text =>
    text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
};

const decipher = salt => {
  const textToChars = text => text.split("").map(c => c.charCodeAt(0));
  const saltChars = textToChars(salt);
  const applySaltToChar = code =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded =>
    encoded
      .match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join("");
};
