import DisplayComponent from "./DisplayComponent";
import TileComponent from "./TileComponent";
import "../css/CalculatorComponent.css";
import { useState } from "react";

export default function CalculatorComponent() {
  const calc_symbols = [
    "C",
    "( )",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "+/-",
    "0",
    ".",
    "=",
  ]

  function Symbol(label,descriptor){
    this.label = label;
    this.descriptor = descriptor;
  }

  const [calculation, setCalculation] = useState("---");
  const [hasCalculated, setHasCalculated] = useState(false);
  const [nextMinus, setNextMinus] = useState(false);
  const [hasBracket, setHasBracket] = useState(false);


  /**
   * Handles delete event
   */
  const handleDelete = () => {
    console.log(calculation);
    setCalculation((prev) => prev.slice(0, prev.length - 1));
  };

  /**
   * Handle tile clicks
   *
   * @param {MouseEvent} tile onclick event handler
   */
  const handleTileClick = (tile) => {
    let tileLabel = tile.target.textContent;

    if (hasCalculated) {
      setCalculation(calculation.replace("=", ""));
      setHasCalculated(false);
    }

    if (tileLabel === "+/-") {
      setNextMinus(true);
      return;
    }

    if (calculation === "---") {
      setCalculation("");
    }

    if (tileLabel === "C") {
      setCalculation("");
    } else if (tileLabel === "( )") {
      console.log("registered");
      if (hasBracket === false) {
        tileLabel = "(";
        setCalculation((prev) => [...prev, tileLabel]);
        setHasBracket(true);
      } else {
        tileLabel = ")";
        setCalculation((prev) => [...prev, tileLabel]);
        setHasBracket(false);
      }
    } else if (tileLabel === "=") {
      const formattedCalculation = calculation.join("");
      const calculatedAnswer = eval(formattedCalculation);
      setCalculation(`= ${calculatedAnswer}`);
      setHasCalculated(true);
    } else {
      console.log("last");
      if (nextMinus) {
        tileLabel = `(-${tileLabel})`;
        setNextMinus(false);
      }
      setCalculation((prev) => [...prev, tileLabel]);
    }
  };

  return (
    <div className="calculator-container">
      <DisplayComponent
        currentCalculation={calculation}
        handleDelete={handleDelete}
      />
      <div />
      <div className="calculator-tiles">
        {calc_symbols.map((sym) => (
          <TileComponent
            key={sym}
            tileLabel={sym}
            handleClick={handleTileClick}
          />
        ))}
      </div>
    </div>
  );
}
