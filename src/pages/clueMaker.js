import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import QRCode from "qrcode.react";
import "@material/textfield/dist/mdc.textfield.css";
import "@material/floating-label/dist/mdc.floating-label.css";
import "@material/notched-outline/dist/mdc.notched-outline.css";
import "@material/line-ripple/dist/mdc.line-ripple.css";
import { TextField } from "@rmwc/textfield";
import "@material/button/dist/mdc.button.css";
import { Button } from "@rmwc/button";
//
import useLocalStorage from "../comps/UseLocalStorageHook";
import { cipher, key, baseClueUrl } from "../comps/ClueCipher";

const defaultCluesData = {
  1: {
    number: 1,
    text: "Behind a small door in the place where beasts are singed.",
    answer: "kitchen cupboard",
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

  const onAddClueClick = e => {
    e.preventDefault();
    const newClueNumber = clueKeys.length + 1;
    const newClue = {
      number: newClueNumber,
      text: "It's in the house!",
      answer: "Somewhere in the house."
    };

    const newClues = { ...clues, [newClueNumber]: newClue };
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
      <Button label="Add Clue" raised onClick={onAddClueClick} />
      <hr />
      <CluesToPrint clues={clues} />
    </CLUE_MAKER>
  );
};

const ClueInput = ({ clue, onChange }) => {
  const onClueChange = e => {
    e.preventDefault();
    const newClue = { ...clue, text: e.target.value };
    onChange(newClue);
  };

  const onAnswerChange = e => {
    e.preventDefault();
    const newClue = { ...clue, answer: e.target.value };
    onChange(newClue);
  };

  return (
    <CLUE_INPUT>
      <h2>CLUE: {clue.number}</h2>

      <TextField
        value={clue.text}
        onChange={onClueChange}
        textarea
        outlined
        fullwidth
        label={`Clue: ${clue.number}`}
        rows={1}
      />

      <TextField
        style={{ marginTop: 20 }}
        value={clue.answer}
        onChange={onAnswerChange}
        textarea
        outlined
        fullwidth
        label={`Clue: ${clue.number} Answer`}
        rows={1}
      />
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

const CluesToPrint = ({ clues }) => {
  const clueKeys = Object.keys(clues);
  return (
    <div>
      <h2>CLUES TO PRINT</h2>
      <CLUES_TO_PRINT>
        {clueKeys.map(key => {
          const clue = clues[key];
          const { number } = clue;
          const message =
            number === 1
              ? "Give this to the treasure hunter."
              : clues[number - 1].answer;

          return (
            <CLUE_FOR_PRINTING>
              <h3>CLUE: {clue.number}</h3>
              <p>Clue master: {message}</p>
              <ClueQRCode clue={clue} />
            </CLUE_FOR_PRINTING>
          );
        })}
      </CLUES_TO_PRINT>
    </div>
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
  display: flex;
  flex-direction: column;
  max-width: 300px;
  word-break: break-all;
`;

const CLUES_TO_PRINT = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CLUE_FOR_PRINTING = styled.div`
  border: 1px solid black;
  margin: 10px;
  padding: 20px;
  max-width: 320px;
`;
