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
import { cipher, key, baseClueUrl } from "../comps/ClueCipher";

const defaultCluesData = {
  1: {
    number: 1,
    text: "Behind a small door in the place where beasts are singed.",
    message: "Give this to the treasure hunter."
  }
};

export const ClueMaker = () => {
  const [cluesStr, setClues] = useLocalStorage(
    "clues",
    JSON.stringify(defaultCluesData)
  );

  const clues = JSON.parse(cluesStr);
  const clueKeys = Object.keys(clues);

  const onClueChange = newClue => {
    const newClues = { ...clues, [newClue.number]: newClue };
    const newCluesStr = JSON.stringify(newClues);
    setClues(newCluesStr);
  };

  return (
    <CLUE_MAKER>
      <HEADER>QR Treasure Hunt</HEADER>
      <Link to="/">HOME</Link>

      {clueKeys.map(key => {
        const clue = clues[key];
        return (
          <ClueInput key={clue.number} clue={clue} onChange={onClueChange} />
        );
      })}
    </CLUE_MAKER>
  );
};

const ClueInput = ({ clue, onChange }) => {
  const onClueChange = e => {
    e.preventDefault();
    const newClue = { ...clue, text: e.target.value };
    onChange(newClue);
  };

  return (
    <CLUE_INPUT>
      <TextField
        value={clue.text}
        onChange={onClueChange}
        textarea
        outlined
        fullwidth
        label={`Clue: ${clue.number}`}
        rows={1}
      />

      <ClueQRCode clue={clue} />
    </CLUE_INPUT>
  );
};

const ClueQRCode = ({ clue }) => {
  if (!clue.text) {
    return <div>[NEED SOME TEST FOR QR CODE]</div>;
  }

  const myCipher = cipher(key);
  const scrambledClue = myCipher(clue.text);
  const clueUrl = baseClueUrl + scrambledClue;

  return (
    <CLUE_QR_CODE>
      <QRCode size={300} value={clueUrl} />
      <a href={clueUrl}>{clueUrl}</a>
    </CLUE_QR_CODE>
  );
};

const HEADER = styled.h1`
  text-align: center;
`;

const CLUE_MAKER = styled.div`
  display: flex;
  flex-direction: column;
`;

const CLUE_INPUT = styled.div`
  padding: 20px 0;
`;

const CLUE_QR_CODE = styled.div`
  padding: 20px 0;
`;
