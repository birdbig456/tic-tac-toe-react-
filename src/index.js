import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [turn, setTurn] = useState(0);
  const [message, setMessage] = useState("");
  const [gameState, setGameState] = useState("playing");
  const [table, settable] = useState({});

  const winning = _ => {
    return (
      (table[0] &&
        table[1] &&
        table[2] &&
        table[0] === table[1] &&
        table[1] === table[2]) ||
      (table[3] &&
        table[4] &&
        table[5] &&
        table[3] === table[4] &&
        table[4] === table[5]) ||
      (table[6] &&
        table[7] &&
        table[8] &&
        table[6] === table[7] &&
        table[7] === table[8]) ||
      (table[0] &&
        table[3] &&
        table[6] &&
        table[0] === table[3] &&
        table[3] === table[6]) ||
      (table[1] &&
        table[4] &&
        table[7] &&
        table[1] === table[4] &&
        table[4] === table[7]) ||
      (table[2] &&
        table[5] &&
        table[8] &&
        table[2] === table[5] &&
        table[5] === table[8]) ||
      (table[0] &&
        table[4] &&
        table[8] &&
        table[0] === table[4] &&
        table[4] === table[8]) ||
      (table[2] &&
        table[4] &&
        table[6] &&
        table[2] === table[4] &&
        table[4] === table[6])
    );
  };

  useEffect(
    () => {
      if (winning()) {
        setMessage(`Player ${turn % 2 ? 1 : 2} wins!`);
        setGameState("stopped");
      } else {
        setTurn(turn + 1);
      }
    },
    [table]
  );

  const step = (n, turn) => {
    if (gameState === "playing" && !table[n]) {
      settable({ ...table, [n]: turn % 2 ? "x" : "o" });
    }
  };

  return (
    <div className="App">
      Turn {turn}
      <div className="container">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(n => (
          <div key={"b" + n} className={"b" + n}>
            <button onClick={_ => step(n, turn)}>{table[n] || " "}</button>
          </div>
        ))}
      </div>
      {message}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
