import React, { useState } from 'react';
import Show_graph from '../ShadowGraph/ShadowGraph';
import { pow,sqrt } from 'mathjs';
import { Button, TextField } from '@mui/material';
function OnePointIteration() {
  const [initialGuess, setInitialGuess] = useState(0);
  const [tolerance, setTolerance] = useState(0.0001);
  const [ans, setans] = useState("1/43-x");
  const [func, setFunc] = useState("1/43-x");
  const [result, setResult] = useState(null);
  const [xe,setXe] = useState(0);
  const g = (x) => eval(func); // Define the function here

  
  const calculateRoot = () => {
    setFunc(ans);
    let x0 = initialGuess;
    let x1 = g(x0);
    let iteration = 0;
    let max = 100000000;
    console.log(x1);
    
    while (Math.abs(x1 - x0) >= tolerance) {
      
      x0 = x1;
      x1 = g(x0);
      iteration++;
      if(iteration >= max){
        break;
      }
    }
    if(iteration >= max){
      setResult(`It max iteration`);
    }else{
      setResult(`Root: ${x1} (found in ${iteration} iterations)`);
      setXe(x1);
    }
  }

  return (
    <div>

      <div className='a'>
        <label htmlFor="initialGuess"></label>
        <TextField  label="initialGuess" type="number" id="initialGuess" value={initialGuess} onChange={(e) => setInitialGuess(parseFloat(e.target.value))} />
      </div>

      
      <div className='b'>
        <label htmlFor="ans">ans:</label>
        <TextField  label="Propostiton" type="text" id="ans" value={ans} onChange={(e) => setans(e.target.value)} />
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

      <div>
          <button onClick={calculateRoot}>Calculate Root</button>
      </div>
    
      <div>
         <div>{result}</div>
      </div>
     

      <div className='fixshowg'>
        <div className='showg'>
          <Show_graph func={func} x={xe} y={g(xe)}/>
        </div>
      </div>

    </div>
  );
}

export default OnePointIteration;