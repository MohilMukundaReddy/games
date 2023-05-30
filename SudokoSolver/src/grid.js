import React, { useEffect, useState } from 'react';
import './grid.css'; // Import the CSS file
import SudokuSolver from './algorithms.js'; // Import the SudokuSolver class

const Grid = () => {
  const initialGridData = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      row.push("");
    }
    initialGridData.push(row);
  }

  const [gridData, setGridData] = useState(initialGridData);
  const [tablelength, setLength] = useState(9);

  function isPerfectSquare(number) {
    const sqrt = Math.sqrt(number);
    return sqrt === Math.floor(sqrt);
  }

  const handleLength = () => {
    const inputValue = prompt('Enter a single-digit number:');
    const value = parseInt(inputValue);
    if (value >= 4 && isPerfectSquare(value)) {
      setLength(value);
      const temp = [];
      for (let i = 0; i < value; i++) {
        const row = [];
        for (let j = 0; j < value; j++) {
          row.push("");
        }
        temp.push(row);
      }
      setGridData(temp);
    } else {
      alert("Not a valid length");
    }
  };

  const handleResetClick = () => {
    const temp = [];
    for (let i = 0; i < tablelength; i++) {
      const row = [];
      for (let j = 0; j < tablelength; j++) {
        row.push("");
      }
      temp.push(row);
    }
    setGridData(temp);
  };

  useEffect(()=> {
    console.log(gridData); //useEffect triggers when ever there is rereddering we can see 
                            // in this case only occures when states are changing
  });

  const handleSolveClick = () => {
    const solver = new SudokuSolver();
    const solvedBoard = solver.solveSudoku(gridData);
    console.log(solvedBoard);
    if(solvedBoard[0][0] === 0)
    {
      alert("no solutions for this configuration try again");
      const temp = [];
      for (let i = 0; i < tablelength; i++) {
        const row = [];
        for (let j = 0; j < tablelength; j++) {
          row.push("");
        }
        temp.push(row);
      }
      setGridData(temp);
    }
    else if(solvedBoard[0][0] === 1)
    {
      const newGridData = solvedBoard[1].map((row) => [...row]);
      setGridData(newGridData);
    }
    else
    {
      alert("there is more than 1 solution invalid configuration");
      const temp = [];
      for (let i = 0; i < tablelength; i++) {
        const row = [];
        for (let j = 0; j < tablelength; j++) {
          row.push("");
        }
        temp.push(row);
      }
      setGridData(temp);
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const inputValue = prompt('Enter a single-digit number:');
    if(inputValue === "")
    {
      const updatedGridData = [...gridData];
      updatedGridData[rowIndex][colIndex] = "";
      setGridData(updatedGridData);
      return;
    }
    const number = parseInt(inputValue);
    if (!isNaN(number) && number >= 1 && number <= tablelength) {
      const updatedGridData = [...gridData];
      updatedGridData[rowIndex][colIndex] = number;
      setGridData(updatedGridData);
    } else {
      alert('Enter a valid number');
    }
  };

  return (
    <div className="grid-container">
      <div>
        <h3><strong>Rules:</strong></h3>
      <ul>
        <li>The given problem must have <strong>atleast one solution</strong> and that's <strong>unique solution</strong>(verified here)</li>
        <li><strong>Each digit</strong> must occur exactly once in <strong>each row</strong>.</li>
        <li><strong>Each digit</strong> must occur exactly once in <strong>each column</strong>.</li>
        <li><strong>Each digit</strong> must occur exactly once in each of the <strong>{tablelength} {Math.sqrt(tablelength)}x{Math.sqrt(tablelength)} </strong>sub-boxes of the grid.</li>
      </ul>
    </div>

      <div className="table-length">
        <button onClick={handleLength}>Table Length: {tablelength}</button>
      </div>
      <table className="grid-table">
        <tbody>
          {gridData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className="grid-cell"
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="reset-button" onClick={handleResetClick}>
          Reset
        </button>
        <button className="solve-button" onClick={handleSolveClick}>
          Solve
        </button>
      </div>
    </div>
  );
};

export default Grid;
