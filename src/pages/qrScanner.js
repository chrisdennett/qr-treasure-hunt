import React, { useState } from "react";
import "@material/button/dist/mdc.button.css";
import { Button } from "@rmwc/button";
import styled from "styled-components";
import QrReader from "react-qr-reader";

export const QRScanner = () => {
  const [result, setResult] = useState(null);
  const handleScan = data => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = err => {
    console.error(err);
  };

  return (
    <QR_SCANNER>
      <h1>QR Treasure Hunt</h1>

      <QR_READER_HOLDER>
        {result && <a href={result}>SEE CLUE</a>}
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      </QR_READER_HOLDER>
    </QR_SCANNER>
  );
};

const QR_SCANNER = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 50px;
  }
`;

const QR_READER_HOLDER = styled.div`
  max-width: 400px;
  min-width: 400px;
  a {
    padding: 20px;
    font-size: 24px;
    background: purple;
    color: white;
    margin: 15px 0;
    display: block;
    text-decoration: none;
    font-weight: bold;
    border-radius: 10px;
  }
`;
