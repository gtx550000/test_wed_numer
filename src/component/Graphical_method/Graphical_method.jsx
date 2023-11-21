import "mafs/core.css";
import "mafs/font.css";
import {Plot,Mafs,Coordinates,Theme} from "mafs";
import { useState } from "react";

export default function Graphical()
{
  const[ans,setans]=useState(1);
  const[equation,setequation]=useState("");

  const polt=()=>
  {
    setequation(ans);
  }

  return (
  <div>
  <Mafs>
  <Coordinates.Cartesian/>
  <Plot.OfX y={(e)=> eval(equation)} color={Theme.blue}/>
  </Mafs>

  <div>
    <label htmlFor="ans"></label>
    <input type="text" id="ans" value={ans} onChange={(e)=>setans(e.target.value)}/>
  </div>
  
  <div>
    <button onClick={polt}>polt</button>
  </div>

  </div>

  );









}