import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

export const Clue = ({ clueId }) => (
  <div>
    <HEADER>
      <h1>Clue: {clueId}</h1>
      <p>
        Go to the toilet and let it rain. Wait, no, not like that you dirty boys
      </p>
      Scan a new clue: <Link to="/qrScanner">QR Scanner</Link>
    </HEADER>
  </div>
);

const HEADER = styled.h1`
  text-align: center;
`;
