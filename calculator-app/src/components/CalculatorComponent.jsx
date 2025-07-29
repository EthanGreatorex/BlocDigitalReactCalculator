import DisplayComponent from "./DisplayComponent";
import TileComponent from "./TileComponent";
import "../css/CalculatorComponent.css";
import { use, useEffect, useState } from "react";

export default function CalculatorComponent() {
  // const calc_symbols = [
  //   "C",
  //   "( )",
  //   "%",
  //   "/",
  //   "7",
  //   "8",
  //   "9",
  //   "*",
  //   "4",
  //   "5",
  //   "6",
  //   "-",
  //   "1",
  //   "2",
  //   "3",
  //   "+",
  //   "+/-",
  //   "0",
  //   ".",
  //   "=",
  // ];

  const calc_symbols = [
    { label: "C", description: "Clear" },
    { label: "( )", description: "Parentheses" },
    { label: "%", description: "Modulo" },
    { label: "/", description: "Divide" },
    { label: "7", description: "Seven" },
    { label: "8", description: "Eight" },
    { label: "9", description: "Nine" },
    { label: "*", description: "Multiply" },
    { label: "4", description: "Four" },
    { label: "5", description: "Five" },
    { label: "6", description: "Six" },
    { label: "-", description: "Subtract" },
    { label: "1", description: "One" },
    { label: "2", description: "Two" },
    { label: "3", description: "Three" },
    { label: "+", description: "Add" },
    { label: "+/-", description: "Negative" },
    { label: "0", description: "Zero" },
    { label: ".", description: "Decimal" },
    { label: "=", description: "Equals" },
  ];

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
    var tileLabel = tile.target.textContent;

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
      if (nextMinus) {
        tileLabel = `(-${tileLabel})`;
        setNextMinus(false);
      }
      console.log("inside");
      console.log(calculation);
      console.log("Tile Label", tileLabel);
      setCalculation((prev) => [...prev, tileLabel]);
      console.log(calculation);
    }
  };

  /**
   * Handles keypress events for the calculator
   * This allows users to use the keyboard for input.
   */
  useEffect(() => {
    const handleKeyPress = (event) => {
      let key = event.key;

      if (key === "Enter") {
        key = "=";
      } else if (key === "Backspace") {
        handleDelete();
        return;
      } else if (key === "Escape") {
        setCalculation("");
        return;
      }

      const validKeys = [
        "C",
        "(",
        ")",
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
      ];

      if (validKeys.includes(key)) {
        const tile = { target: { textContent: key } };
        handleTileClick(tile);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [calculation, hasCalculated, nextMinus, hasBracket]);

  return (
    <div className="calculator-container">
      <DisplayComponent
        currentCalculation={calculation}
        handleDelete={handleDelete}
      />
      <div />
      <div className="calculator-tiles">
        {calc_symbols.map((symbol) => (
          <TileComponent
            key={symbol.label}
            tileLabel={symbol.label}
            description={symbol.description}
            handleClick={handleTileClick}
          ></TileComponent>
        ))}
      </div>
    </div>
  );
}
