import React, { useState } from 'react';

function MatrixInput() {
    const [dimension, setDimension] = useState(2);
    const [matrix, setMatrix] = useState(Array.from({ length: dimension }, () => Array(dimension + 1).fill(0)));
    const [answer, setAnswer] = useState([]);
    const [numIterations, setNumIterations] = useState(0); // Change this to store the number of iterations

    const handleDimensionChange = (e) => {
        const newDimension = parseInt(e.target.value, 10);
        setDimension(newDimension);
        setMatrix(Array.from({ length: newDimension }, () => Array(newDimension + 1).fill(0)));
    };

    const handleMatrixChange = (e, rowIndex, colIndex) => {
        const newValue = parseFloat(e.target.value);
        const newMatrix = [...matrix];
        newMatrix[rowIndex][colIndex] = newValue;
        setMatrix(newMatrix);
    };

    const dotProduct = (a, b) => a.reduce((acc, val, index) => acc + val * b[index], 0);

    const matrixVectorMult = (A, vec) => A.map(row => dotProduct(row, vec));

    const subtractVectors = (a, b) => a.map((val, index) => val - b[index]);

    const addVectors = (a, b) => a.map((val, index) => val + b[index]);

    const scalarMult = (scalar, vec) => vec.map(val => scalar * val); 

    const calculate = () => {
        const A = matrix.map(row => row.slice(0, dimension));
        const b = matrix.map(row => row[dimension]);

        let x = Array(dimension).fill(0);
        let r = subtractVectors(b, matrixVectorMult(A, x));
        let p = [...r];
        let rsold = dotProduct(r, r);

        let iterationCount = 0; // Use this to count the iterations

        for (let i = 0; i < dimension; i++) {
            const Ap = matrixVectorMult(A, p);
            const alpha = rsold / dotProduct(p, Ap);
            x = addVectors(x, scalarMult(alpha, p));
            r = subtractVectors(r, scalarMult(alpha, Ap));

            iterationCount++; // Increment the iteration count

            const rsnew = dotProduct(r, r);
            if (Math.sqrt(rsnew) < 1e-10) break;
            p = addVectors(r, scalarMult(rsnew / rsold, p));
            rsold = rsnew;
        }

        setAnswer(x);
        setNumIterations(iterationCount); // Set the counted iterations
    };

    return (
        <div>
            <h2>Conjugate Gradient</h2>
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
            <button onClick={calculate}>Calculate</button>

            <div>
                <h3>Final Answer:</h3>
                {answer.map((value, index) => (<p key={index}>x{index}: {value.toFixed(4)}</p>))}
            </div>

            <div>
                <h3>Number of Iterations:</h3>
                <p>{numIterations}</p> {/* Display the number of iterations here */}
            </div>
        </div>
    );
}

export default MatrixInput;