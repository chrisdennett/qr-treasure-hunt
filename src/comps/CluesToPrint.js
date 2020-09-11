import React from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";
//
import { cipher, key, baseClueUrl } from "./ClueCipher";

export const CluesToPrint = ({ clues }) => {
  const clueKeys = Object.keys(clues);
  return (
    <div>
      <h2 className={"do-not-print"}>CLUES TO PRINT</h2>
      <CLUES_TO_PRINT>
        {clueKeys.map((key) => {
          const clue = clues[key];
          const { number } = clue;
          const message =
            number === 1
              ? "Give this to the treasure hunter."
              : `Put: ${clues[number - 1].answer}`;

          return (
            <CLUE_FOR_PRINTING>
              <h3>CLUE: {clue.number}</h3>
              <ClueQRCode clue={clue} />
              <p>{message}</p>
            </CLUE_FOR_PRINTING>
          );
        })}
      </CLUES_TO_PRINT>
    </div>
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
      <QRCode size={190} value={clueUrl} />
      {/* <a href={clueUrl}>{clueUrl}</a> */}
    </CLUE_QR_CODE>
  );
};

const CLUE_QR_CODE = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  max-width: 200px;
  word-break: break-all;
`;

const CLUES_TO_PRINT = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CLUE_FOR_PRINTING = styled.div`
  border: 0.5px solid black;
  margin: -0.5px;
  padding: 10px;
  width: 200px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */

  h3 {
    margin: 0 0 5px 0;
    font-size: 12px;
  }

  p {
    margin: 5px 0 0 0;
    font-size: 12px;
  }
`;
