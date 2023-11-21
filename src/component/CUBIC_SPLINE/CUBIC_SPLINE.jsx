import React, { useState } from 'react';

const CubicSpline = () => {
  const [points, setPoints] = useState([{ x: 0, y: 0 }, { x: 1, y: 1 }]);
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(null);
  const [error, setError] = useState('');

  const handlePointChange = (e, index, type) => {
    const newPoints = [...points];
    if (isNaN(e.target.value)) {
      return;
    }
    newPoints[index][type] = parseFloat(e.target.value);
    setPoints(newPoints);
  };

  const addPoint = () => {
    setPoints([...points, { x: 0, y: 0 }]);
  };

  const calculateY = () => {
    const y = lagrangeInterpolation(xValue);
    setYValue(y);
  };
  const lagrangeInterpolation = (x) => {
    let result = 0;
    
    // Sort the points by x-values
    const sortedPoints = [...points].sort((a, b) => a.x - b.x);

    for (let i = 0; i < sortedPoints.length; i++) {
        let term = sortedPoints[i].y;
        for (let j = 0; j < sortedPoints.length; j++) {
            if (i !== j) {
                if (sortedPoints[i].x === sortedPoints[j].x) {
                    setError('Two points have the same x-value. Please correct.');
                    return;
                }
                term = term * (x - sortedPoints[j].x) / (sortedPoints[i].x - sortedPoints[j].x);
            }
        }
        result += term;
    }
    setError('');  // Clear error if there is no problem
    return result;
};

  return (
    <div>
      <h1>Cubic Spline Calculator</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {points.map((point, index) => (
          <div key={index}>
            <input
              type="number"
              value={point.x}
              onChange={(e) => handlePointChange(e, index, 'x')}
            />
            <input
              type="number"
              value={point.y}
              onChange={(e) => handlePointChange(e, index, 'y')}
            />
          </div>
        ))}
        <button onClick={addPoint}>Add Point</button>
      </div>
      <div>
        <label>
          x:
          <input
            type="number"
            value={xValue}
            onChange={(e) => setXValue(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <button onClick={calculateY}>Calculate y</button>
      {yValue !== null && <p>Result: y = {yValue}</p>}
    </div>
  );
};

export default CubicSpline;
