import React, {Component} from "react"

class App extends Component {
  constructor() {
    super()
    this.state = {
      display: "0",
      prevCalc: "0",
      lastValue: "0",
      lastClassName: "",
      negative: false
    }
    this.logState = this.logState.bind(this)
    this.handleNumber = this.handleNumber.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleOperator = this.handleOperator.bind(this)
    this.handleSubtract = this.handleSubtract.bind(this)
    this.handleDecimal = this.handleDecimal.bind(this)
    this.handleEquals = this.handleEquals.bind(this)
  }
  logState() {
    console.log(this.state)
  }
  handleNumber(e) {
    this.setState(prevState => {
      const currValue = e.target.value
      return ( 
        this.state.display === "0" || 
        this.state.lastValue === "="? 
        {
          display: currValue,
          prevCalc: "0",
          lastValue: currValue,
          lastClassName: e.target.className
        } :
        {
          display: prevState.display + currValue,
          lastValue: currValue,
          lastClassName: e.target.className,
          negative: false
        }
      )
    })
  }
  handleClear() {
    this.setState(prevState => {
      return (
        {
          display: "0",
          prevCalc: "0",
          lastValue: "0",
          lastClassName: "",
          negative: false
        }
      )
    })
  }
  handleOperator(e) {
    this.setState(prevState => { 
      const currValue = e.target.value
      return (
        prevState.negative === true?
        {
          display: prevState.display.slice(0, -2) + currValue,
          lastValue: currValue,
          negative: false
        } :
        this.state.lastValue === "="? 
        {
          display: currValue,
          lastValue: currValue,
          lastClassName: e.target.className
        } :
        this.state.lastClassName === "operator"?
        {
          display: prevState.display.slice(0, -1) + currValue,
          lastValue: currValue
        } :
        {
          display: prevState.display + currValue,
          lastValue: currValue,
          lastClassName: e.target.className
        }
      )
    })
  }
  handleSubtract(e) {
    this.setState(prevState => {
      return (
        prevState.negative === true?
        null :
        this.state.lastValue === "="? 
        {
          display: "-",
          lastValue: "-",
          lastClassName: e.target.className
        } :
        this.state.lastClassName === "operator"?
        {
          display: prevState.display + "-",
          lastValue: "-",
          lastClassName: e.target.className,
          negative: true
        } :
        {
          display: prevState.display + "-",
          lastValue: "-",
          lastClassName: e.target.className
        }
      )
    })
  }
  handleDecimal(e) {
    this.setState(prevState => {
      const lastDec = /\.[0-9]*$/
      return (
        this.state.lastValue === "="? 
        {
          display: ".",
          prevCalc: "0",
          lastValue: ".",
          lastClassName: e.target.className
        } : 
        this.state.display.match(lastDec)? 
        null :
        {
          display: prevState.display + ".",
          lastValue: ".",
          lastClassName: e.target.className,
          negative: false
        }
      )
    })
  }
  handleEquals() {
    this.setState(prevState => {
      const decPlace = 1000000
      const {display, lastClassName, lastValue} = prevState
      const beforeDecIsNumber = /[\d]/.test(display[display.length-2])

      const calculation = lastClassName === "operator" || 
      (lastValue === "." && beforeDecIsNumber == false) ?
      false : prevState.prevCalc == "0"?
      Math.round(eval(display)*decPlace)/decPlace :
      Math.round(eval(prevState.prevCalc + display)*decPlace)/decPlace
      console.log(calculation)

      return (
        calculation &&
        {
        display: calculation,
        prevCalc: calculation,
        lastValue: "=",
        lastClassName: "equals",
        negative: false
        }
      )
    })
  }
  render() {
    // const onInput = () => {
    //   return ( 
    //     (this.value.length > this.maxLength) &&
    //     (this.value = this.value.slice(0, this.maxLength))
    //   )}
    return (
      <div id="container">
        <div id="calculator">
          <button id="clear" onClick={this.handleClear}>A/C</button>
          <button value="0" id="zero" className="number" onClick={this.handleNumber}>0</button>
          <button value="." id="decimal" className="number" onClick={this.handleDecimal}>.</button>
          <button value="1" id="one" className="number" onClick={this.handleNumber}>1</button>
          <button value="2" id="two" className="number" onClick={this.handleNumber}>2</button>
          <button value="3" id="three" className="number" onClick={this.handleNumber}>3</button>
          <button value="4" id="four" className="number" onClick={this.handleNumber}>4</button>
          <button value="5" id="five" className="number" onClick={this.handleNumber}>5</button>
          <button value="6" id="six" className="number" onClick={this.handleNumber}>6</button>
          <button value="7" id="seven" className="number" onClick={this.handleNumber}>7</button>
          <button value="8" id="eight" className="number" onClick={this.handleNumber}>8</button>
          <button value="9" id="nine" className="number" onClick={this.handleNumber}>9</button>
          <button value="+" id="add" className="operator" onClick={this.handleOperator}>+</button>
          <button value="-" id="subtract" className="operator" onClick={this.handleSubtract}>-</button>
          <button value="*" id="multiply" className="operator" onClick={this.handleOperator}>x</button>
          <button value="/" id="divide" className="operator" onClick={this.handleOperator}>/</button>
          <button id="equals" onClick={this.handleEquals}>=</button>
          <h3 /* onInput={onInput} type ="number" maxLength ="6" value={this.state.display} */ 
          id="display">{this.state.display}</h3>
        </div>
        <button id="state" onClick={this.logState}>Log state</button>
      </div>
      
    )
  }
}

export default App


// My original methods:

// handleClick(e) {
//   console.log("handleClick working")
//   console.log(e.target.id)
//   this.setState(prevState => {
//     const last = prevState.display.toString().slice(-1)
//     return (e.target.id === "clear"? {display: 0, prevCalc: 0, equals: false, minus: false} :
//     prevState.display == 0? {display: e.target.value} :
//     prevState.equals === true? e.target.className === "number"?
//     {display: e.target.value, prevCalc: 0, equals: false, minus: false} : 
//     {display: e.target.value, prevCalc: prevState.display, equals: false, minus: false} :
//     e.target.id === "decimal" && prevState.display.toString().includes(".")?
//     null :
//     e.target.className === "operator" &&
//     (last === "+" || last === "*" || last === "/")?
//     {display: prevState.display.slice(0, -1) + e.target.value, minus: false} :
//     last === "-"? e.target.value == "-"?
//     {display: prevState.display.slice(0, -1) + "+", minus: false}:
//     {minus: true}:
//     prevState.minus === true && e.target.className === "number"? {display: prevState.display + (e.target.value * -1), minus: false}:
//     {display: prevState.display + e.target.value, minus: false})

//   })
// }
// handleEquals() {
//   console.log("handleEquals working")
//   this.setState(prevState => {
//     const calculation = prevState.prevCalc === 0? eval(prevState.display):
//     eval(prevState.prevCalc + prevState.display)
//     console.log(calculation)
//     return ({
//       display: calculation,
//       prevCalc: calculation,
//       equals: true
//     })
//   })
// }