import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import QRCode from "qrcode.react";
import "@material/textfield/dist/mdc.textfield.css";
import "@material/floating-label/dist/mdc.floating-label.css";
import "@material/notched-outline/dist/mdc.notched-outline.css";
import "@material/line-ripple/dist/mdc.line-ripple.css";
import { TextField } from "@rmwc/textfield";
//
import useLocalStorage from "../comps/UseLocalStorageHook";
import { cipher, decipher, key, baseClueUrl } from "../comps/ClueCipher";

export const ClueMaker = () => {
  const [clue, setClue] = useLocalStorage("clue1", " ");

  const myCipher = cipher(key);
  const scrambledClue = myCipher(clue);
  const clueUrl = baseClueUrl + scrambledClue;

  const myDecipher = decipher(key);
  const unscrambledClue = myDecipher(scrambledClue);

  const onClueTextChange = e => {
    setClue(e.target.value);
  };

  return (
    <CLUE_MAKER>
      <HEADER>QR Treasure Hunt</HEADER>
      <Link to="/">HOME</Link>
      <p>clue: {clue}</p>
      <p>scrambledClue: {scrambledClue}</p>
      <p>unscrambledClue: {unscrambledClue}</p>
      <p>clueUrl: {clueUrl}</p>
      <TextField outlined value={clue} onChange={onClueTextChange} />
      <QRCode size={300} value={clueUrl} />
    </CLUE_MAKER>
  );
};

const HEADER = styled.h1`
  text-align: center;
`;

const CLUE_MAKER = styled.div`
  display: flex;
  flex-direction: column;
`;
