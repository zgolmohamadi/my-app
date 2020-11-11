import React from "react";
import "../Ui/calculator.css";
const operators = ["+", "-", "/", "*", "%"];
const buttons = [
  "1",
  "2",
  "3",
  "+",
  "4",
  "5",
  "6",
  "-",
  "7",
  "8",
  "9",
  "*",
  "/",
  "0",
  "=",
  "."
];
const getLastChar = (text = "") => text.slice(-1);
class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      result: [],
      prevResult: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  handleChange(e) {
      
      let value=e.target.value;
    let text = this.state.text;
    const isOperator = operators.indexOf(value);
    if (value === "=") {
      this.setState(prevState => this.calculate(prevState, this.state));
      return;
    }
   if (isOperator!=-1 && operators.indexOf(getLastChar(text))!=-1) {
      text = text.slice(0, -1) + value;
    } else {
      text += value;
    }
    
    this.setState({ text });
  } 
  onInputChange(e) {

    let text=e.target.value;
      
    if (buttons.indexOf(getLastChar(text)) === -1) {
      text = text.slice(0, -1);
    }
    this.setState({ text });
  }
  calculate(prevState, state) {
    try {
      const text = (eval(state.text) || "") + "";
      return {
        text,
        result: [...prevState.result, state.text],
        prevResult: [...prevState.prevResult, text]
      };
    } catch (event) {
      return {
        text: "error",
        result: "error",
        prevResult: "error"
      };
    }
  }
  render() {
    return (
      <div className="calculator">
        <div className="resultbar">
          <input
            style={{ height: "30px", width: "200px", font: "20px" }}
            autoFocus="autofocus"
            value={this.state.text}
            onChange={this.onInputChange}
          />
        </div>

        {/* <div className="history">
          <h2>History</h2>
          <h3 style={{ color: "red" }}>{this.state.result.join(" -  ")} </h3>
          <p>{this.state.prevResult.join(" -  ")}</p>
        </div> */}
        <div className="button">
          {buttons.map(x => (
            <button key={x} value={x} onClick={this.handleChange}>
              {x}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
export default Calculator;
