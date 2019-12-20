import React, { useState } from "react";
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
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
        <p>{result}</p>
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
`;
