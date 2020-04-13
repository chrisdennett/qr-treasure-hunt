import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
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
import { FaPrint } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
//
import useLocalStorage from "../comps/UseLocalStorageHook";
import { defaultClueSet } from "../comps/defaultClueSet";
//
import { CluesToPrint } from "../comps/CluesToPrint";

export const ClueMaker = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [cluesStr, setClues] = useLocalStorage(
    "clues",
    JSON.stringify(defaultClueSet)
  );

  const clues = JSON.parse(cluesStr);
  const clueKeys = Object.keys(clues);

  const onClueChange = (newClue) => {
    const newClues = { ...clues, [newClue.number]: newClue };
    const newCluesStr = JSON.stringify(newClues);
    setClues(newCluesStr);
  };

  const onAddClueClick = (e) => {
    e.preventDefault();
    const newClueNumber = clueKeys.length + 1;
    const newClue = {
      number: newClueNumber,
      text: "It's in the house!",
      answer: "Somewhere in the house.",
    };

    const newClues = { ...clues, [newClueNumber]: newClue };
    const newCluesStr = JSON.stringify(newClues);

    setClues(newCluesStr);
  };

  const onDeleteClueClick = (e, clue) => {
    e.preventDefault();
    // create a copy of clues to work on
    const newClues = { ...clues };
    // delete current clue
    const deleteClueNumber = clue.number;
    const totalClues = Object.keys(newClues).length;
    //  all numbers and keys from this number up.
    let updateNumber = deleteClueNumber + 1;

    while (updateNumber <= totalClues) {
      const clueToUpdate = { ...newClues[updateNumber] };
      const newClueNumber = updateNumber - 1;
      clueToUpdate.number = newClueNumber;
      newClues[newClueNumber] = clueToUpdate;
      updateNumber++;
    }

    // now delete the last one
    delete newClues[totalClues];

    setClues(JSON.stringify(newClues));
  };

  return (
    <CLUE_MAKER>
      <div className={"do-not-print"}>
        <HEADER>QR Treasure Hunt</HEADER>
        <StyledNav>
          <StyledLink to="/">HOME</StyledLink>
          <StyledLink to="/qrScanner">START GAME</StyledLink>
        </StyledNav>
        <TabBar
          activeTabIndex={activeTab}
          onActivate={(e) => setActiveTab(e.detail.index)}
        >
          <Tab style={{ borderTop: "solid 1px rgba(0,0,0,0.1)" }}>
            <AiFillEdit /> Make Clues
          </Tab>
          <Tab style={{ borderTop: "solid 1px rgba(0,0,0,0.1)" }}>
            <FaPrint /> Print Clues
          </Tab>
        </TabBar>

        {activeTab === 0 && (
          <div>
            {clueKeys.map((key, index) => {
              const clue = clues[key];
              return (
                <CLUE_INPUT_HOLDER key={clue.number}>
                  <ClueInput
                    clue={clue}
                    isLastClue={index === clueKeys.length - 1}
                    onChange={onClueChange}
                  />
                  <Button
                    label="Delete Clue"
                    raised
                    danger
                    onClick={(e) => onDeleteClueClick(e, clue)}
                  />
                </CLUE_INPUT_HOLDER>
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

const ClueInput = ({ clue, onChange, isLastClue }) => {
  const onClueChange = (e) => {
    e.preventDefault();
    const newClue = { ...clue, text: e.target.value };
    onChange(newClue);
  };

  const onAnswerChange = (e) => {
    e.preventDefault();
    const newClue = { ...clue, answer: e.target.value };
    onChange(newClue);
  };

  return (
    <CLUE_INPUT>
      <h2>
        CLUE: {clue.number}{" "}
        {isLastClue ? "(last clue - leads them to treasure)" : ""}
      </h2>

      <TextField
        value={clue.text}
        onChange={onClueChange}
        textarea
        outlined
        fullwidth
        label={`Clue: ${clue.number}`}
        rows={3}
      />

      <TextField
        style={{ marginTop: 20 }}
        value={clue.answer}
        onChange={onAnswerChange}
        textarea
        outlined
        fullwidth
        label={`Clue: ${clue.number} Answer`}
        rows={3}
      />
    </CLUE_INPUT>
  );
};

const HEADER = styled.h1`
  text-align: center;
  margin-bottom: 0;
`;

const CLUE_MAKER = styled.div`
  display: flex;
  flex-direction: column;
`;

const CLUE_INPUT = styled.div`
  padding: 5px 0;
`;

const CLUE_INPUT_HOLDER = styled.div`
  padding: 5px 0;
  display: flex;
  flex-direction: column;

  button {
    align-self: flex-end;
  }
`;

const StyledLink = styled(Link)`
  margin: 5px;
  padding: 10px 15px;
  background: green;
  color: white;
  text-decoration: none;
  border-radius: 5px;
`;

const StyledNav = styled.nav`
  padding-top: 20px;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;
