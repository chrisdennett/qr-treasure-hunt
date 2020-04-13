import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import { AiOutlineQrcode } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

export const Home = () => {
  return (
    <Holder>
      <HEADER>
        <h1>
          <AiOutlineQrcode /> QR Treasure Hunt Maker
        </h1>
        <p>
          Quick treasure hunt maker to give us parents some time to drink all
          that wine!
        </p>
        <p>
          This is very thrown together, so I've not gone overboard with the user
          experience! Might be useful for some though!
        </p>
        <StyledAnchor
          href="https://artfly.io/qr-treasure-hunt-maker"
          target="_blank"
          rel="noopener noreferrer"
        >
          INFO and INSTRUCTIONS HERE <FiExternalLink />
        </StyledAnchor>
      </HEADER>

      <StyledNav>
        <StyledLink to="/clueMaker" style={{ background: "#cc7100" }}>
          Set up a game: CLUE MAKER
        </StyledLink>

        <StyledLink to="/qrScanner"> Start a game: QR SCANNER</StyledLink>
      </StyledNav>
    </Holder>
  );
};

const Holder = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0;
  }
`;

const HEADER = styled.header`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom: rgba(0, 0, 0, 0.2) 1px solid;
`;

const StyledAnchor = styled.a`
  padding: 10px 15px;
  background: #bd0303;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin: 25px 5px 5px 5px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
`;

const StyledLink = styled(Link)`
  margin: 5px;
  font-size: 1.5em;
  padding: 15px 25px;
  background: green;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
`;

const StyledNav = styled.nav`
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;
