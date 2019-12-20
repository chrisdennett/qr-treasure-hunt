import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import { decipher, key, baseClueUrl } from "../comps/ClueCipher";

export const Clue = ({ clueId }) => {
  const myDecipher = decipher(key);
  const unscrambledClue = myDecipher(clueId);

  return (
    <div>
      <HEADER>
        <h1>Clue: {clueId}</h1>
        <p>{unscrambledClue}</p>
        Scan a new clue: <Link to="/qrScanner">QR Scanner</Link>
      </HEADER>
    </div>
  );
};

const HEADER = styled.h1`
  text-align: center;
`;
