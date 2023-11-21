
import React, { Component } from 'react';

class FalsePositionMethod extends Component {
  constructor() {
    super();
    this.state = {
      a: 0, // Initial lower bound
      b: 1, // Initial upper bound
      ans: 1,
      root: 1,
      tolerance: 0.00001, // Tolerance for stopping criterion
      maxIterations: 100, // Maximum number of iterations
      result: null, // The approximate root
    };
  }

  calculateRoot = () => {
    let { a, b, ans, root, tolerance, maxIterations } = this.state;
    let fa, fb, c, fc;

    for (let i = 0; i < maxIterations; i++) {
      fa = this.functionToSolve(a);
      fb = this.functionToSolve(b);
      c = (a * fb - b * fa) / (fb - fa);
      fc = this.functionToSolve(c);

      if (Math.abs(fc) < tolerance) {
        this.setState({ result: c });
        return;
      }

      if (fc * fa < 0) {
        b = c;
      } else {
        a = c;
      }
    }

    // If maxIterations is reached without converging, display an error
    this.setState({ result: 'No convergence after max iterations' });
  };

  functionToSolve = (x) => {
    // Replace this with the actual function you want to solve
    // For example, if you want to find the root of f(x) = x^2 - 4:
    return Math.pow(this.state.ans,1/this.state.root)-x;
  };

  render() {
    const { a, b,ans,root, tolerance, maxIterations, result } = this.state;
    return (
      <div>
        <h1>False Position Method</h1>
        <div>
          <label>Initial Lower Bound (a):</label>
          <input
            type="number"
            value={a}
            onChange={(e) => this.setState({ a: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Initial Upper Bound (b):</label>
          <input
            type="number"
            value={b}
            onChange={(e) => this.setState({ b: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Initial (ans):</label>
          <input
            type="number"
            value={ans}
            onChange={(e) => this.setState({ ans: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Initial (root):</label>
          <input
            type="number"
            value={root}
            min="1"
            onChange={(e) => this.setState({ root: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Tolerance:</label>
          <input
            type="number"
            value={tolerance}
            onChange={(e) => this.setState({ tolerance: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Max Iterations:</label>
          <input
            type="number"
            value={maxIterations}
            onChange={(e) => this.setState({ maxIterations: parseInt(e.target.value) })}
          />
        </div>
        <button onClick={this.calculateRoot}>Calculate Root</button>
        <div>
          <strong>Approximate Root:</strong> {result}
        </div>
      </div>
    );
  }
}

export default FalsePositionMethod;