import React, { useState } from 'react';
import { derivative, max } from 'mathjs'
import Show_graph from '../ShadowGraph/ShadowGraph';
import { pow,sqrt } from 'mathjs';
function NewtonRaphson() {
  const max_iteration = 100000;
  const [initialGuess, setInitialGuess] = useState(0);
  const [ans, setans] = useState('');
  const [func,setFunc] = useState('');
  const [tolerance, setTolerance] = useState(0.0001);
  const [result, setResult] = useState(null);
  const [x,setX] = useState(null);
  const [y,setY] = useState(null);
  const f = (x) => eval(ans); // Define the function here
  const fPrime = (x) => eval((derivative(ans,'x'))) ; // Define the derivative of the function here
  const calculateRoot = () => {
    let x0 = initialGuess;
    let iteration = 0;
    while (Math.abs(f(x0)) >= tolerance && iteration < max_iteration) {
      x0 = x0 - f(x0) / fPrime(x0);
      console.log("xo: "+x0);
      iteration++;
    }
    setX(x0);
    setY(f(x0));
    setFunc(ans);
    setResult(`Root: ${x0} (found in ${iteration} iterations)`);
  }

  return (
    <div>
      <div>
        <label htmlFor="initialGuess">Initial Guess:</label>
        <input
          type="number"
          id="initialGuess"
          value={initialGuess}
          onChange={(e) => setInitialGuess(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="ans">Ans:</label>
        <input
          type="text"
          id="ans"
          value={ans}
          onChange={(e) => setans(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tolerance">Tolerance:</label>
        <input
          type="number"
          id="tolerance"
          value={tolerance}
          onChange={(e) => setTolerance(parseFloat(e.target.value))}
        />
      </div>
      <button onClick={calculateRoot}>Calculate Root</button>
      <div>{result}</div>
      <Show_graph func = {func} x = {x} y = {y}/>
    </div>
  );
}
export default NewtonRaphson;