import React, { useEffect,useState } from 'react';
import Show_graph from '../ShadowGraph/ShadowGraph';
import { pow,sqrt } from 'mathjs';
import { Button, TextField } from '@mui/material';


  function Bisection() {
    const [a, setA] = useState(0);
    const [b, setB] = useState(1);
    const [ans, setans] = useState("pow(7,0.5)-x");
    const [tolerance, setTolerance] = useState(0.0001);
    const [result, setResult] = useState(null);
    const [val, setval] = useState("pow(7,0.5)-x");
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
    const f = (x) => eval(ans); // Define the function here
   
     
  
  
    const calculateRoot = () => {
      let a = parseFloat(document.getElementById("a").value);
      let b = parseFloat(document.getElementById("b").value);
      let ae = b;
      let be = a;
      let ans =(document.getElementById("ans").value);
      let tolerance = parseFloat(document.getElementById("tolerance").value);
      let fa = f(a);
      let fb = f(b);
      let c;
      let fc;
      let iteration = 0;
  
      while ((be - ae) >= tolerance) {
        c = (ae + be) / 2;
        fc = f(c);
  
        if (fc === 0.0) {
          break;
        } else if (fa * fc < 0) {
          be = c;
          fb = fc;
        } else {
          ae = c;
          fa = fc;
        }
  
        iteration++;
      }
  
      setY(f(c));
      setX(c);
      setval(ans);
      setResult(`Root: ${c} (found in ${iteration} iterations)`);
     
    }
  
    return (
      <div>
        <div className=''>
          <center><h1>Biscetion</h1></center>
          <label htmlFor="a">a:</label>
          <input  label="A" type="number" id="a" value={a} onChange={(e) => setA(parseFloat(e.target.value))} />
        </div>
        <div>
          <label htmlFor="b">b:</label>
          <input type="number" id="b" value={b} onChange={(e) => setB(parseFloat(e.target.value))} />
        </div>
        <div>
          <label htmlFor="ans">ans:</label>
          <input type="text" id="ans" value={ans} onChange={(e) => setans(e.target.value)} />
        </div>
        
        <div>
          <label htmlFor="tolerance">Tolerance:</label>
          <input type="number" id="tolerance" value={tolerance} onChange={(e) => setTolerance(parseFloat(e.target.value))} />
        </div>
        <button onClick={calculateRoot}>Calculate Root</button>
        <div>{result}</div>
       
       <div className=''>
        <div className='showg'>
          <Show_graph func = {val} x = {x} y = {y}/>
        </div>
       </div>
      
      </div> 
  
    );
  }

  export default Bisection;