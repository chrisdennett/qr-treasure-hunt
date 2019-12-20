import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

export const Home = () => {
  return (
    <div>
      <HEADER>QR Treasure Hunt</HEADER>
      <p>
        Quick treasure hunt maker to give us parents some time to drink all that
        wine!
      </p>

      <nav>
        <url>
          <li>
            Set up a game: <Link to="/clueMaker">Clue Maker</Link>
          </li>
          <li>
            Start a game: <Link to="/qrScanner">QR Scanner</Link>
          </li>
        </url>
      </nav>
    </div>
  );
};

const HEADER = styled.h1`
  text-align: left;
`;
