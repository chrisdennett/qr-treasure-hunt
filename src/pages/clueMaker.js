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
import "@material/tab-bar/dist/mdc.tab-bar.css";
import "@material/tab/dist/mdc.tab.css";
import "@material/tab-scroller/dist/mdc.tab-scroller.css";
import "@material/tab-indicator/dist/mdc.tab-indicator.css";
import { TabBar, Tab } from "@rmwc/tabs";
//
import useLocalStorage from "../comps/UseLocalStorageHook";
import { cipher, key, baseClueUrl } from "../comps/ClueCipher";
//
import { CluesToPrint } from "../comps/CluesToPrint";

const defaultCluesData = {
  1: {
    number: 1,
    text: "Behind a small door in the place where beasts are singed.",
    answer: "kitchen cupboard",
    message: "Give this to the treasure hunter."
  }
};

export const ClueMaker = () => {
  const [activeTab, setActiveTab] = React.useState(1);
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
      <div className={"do-not-print"}>
        <HEADER>QR Treasure Hunt</HEADER>
        <Link to="/">HOME</Link>
        <TabBar
          activeTabIndex={activeTab}
          onActivate={e => setActiveTab(e.detail.index)}
        >
          <Tab>Make Clues</Tab>
          <Tab>Print Clues</Tab>
        </TabBar>

        {activeTab === 0 && (
          <div>
            {clueKeys.map(key => {
              const clue = clues[key];
              return (
                <ClueInput
                  key={clue.number}
                  clue={clue}
                  onChange={onClueChange}
                />
              );
            })}
            <Button label="Add Clue" raised onClick={onAddClueClick} />
          </div>
        )}
      </div>

      {activeTab === 1 && <CluesToPrint clues={clues} />}
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

const HEADER = styled.h1`
  text-align: center;
`;

const CLUE_MAKER = styled.div`
  display: flex;
  flex-direction: column;
`;

const CLUE_INPUT = styled.div`
  padding: 5px 0;
`;
