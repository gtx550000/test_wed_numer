import React, { useState } from 'react';

function MatrixInput() {
  const [dimension, setDimension] = useState(2);
  const [matrix, setMatrix] = useState(Array.from({ length: dimension }, () => Array(dimension+1).fill(0)));
  const [answer, setAnswer] = useState([]);

  const handleDimensionChange = (e) => {
    const newDimension = parseInt(e.target.value, 10);
    setDimension(newDimension);
    setMatrix(Array.from({ length: newDimension }, () => Array(newDimension+1).fill(0)));
  };

  const handleMatrixChange = (e, rowIndex, colIndex) => {
    const newValue = parseFloat(e.target.value);
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = newValue;
    setMatrix(newMatrix);
  };

  const gaussSeidel = (A, b) => {
    const maxIterations = 1000;
    const tolerance = 0.0001;
    let x = Array(dimension).fill(0);
    let previousX = Array(dimension).fill(0);

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      for (let i = 0; i < dimension; i++) {
        let sum = b[i];

        for (let j = 0; j < dimension; j++) {
          if (i !== j) {
            sum -= A[i][j] * x[j];
          }
        }

        x[i] = sum / A[i][i];
      }

      let difference = x.map((value, index) => Math.abs(value - previousX[index]));
      if (Math.max(...difference) < tolerance) {
        break;
      }

      previousX = [...x];
    }

    return x;
  };

  const calculate = () => {
    const A = matrix.map(row => row.slice(0, dimension));
    const b = matrix.map(row => row[dimension]);
    const result = gaussSeidel(A, b);
    setAnswer(result);
  };

  return (
    <div>
      <h2>Dimension</h2>
      <input type="number" min="2" value={dimension} onChange={handleDimensionChange} />

      <div>
        <h3>Enter Matrix Values:</h3>
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((value, colIndex) => (
              <input
                key={colIndex}
                type="number"
                value={value}
                onChange={(e) => handleMatrixChange(e, rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={calculate}>Calculate </button>
      {answer.map((value, index) => (<p>x{index + 1}: {value.toFixed(4)}</p>))}
    </div>
  );
}

export default MatrixInput;