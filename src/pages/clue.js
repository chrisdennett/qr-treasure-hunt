import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import { decipher, key } from "../comps/ClueCipher";

export const Clue = ({ clueId }) => {
  const myDecipher = decipher(key);
  const clue = myDecipher(clueId);

  return (
    <div>
      <HEADER>
        <h1>Clue:</h1>
        <CLUE_TEXT>{clue}</CLUE_TEXT>
        Scan a new clue: <Link to="/qrScanner">QR Scanner</Link>
      </HEADER>
    </div>
  );
};

const HEADER = styled.div`
  text-align: center;
`;

const CLUE_TEXT = styled.h2`
  font-size: 42px;
`;
