import React from 'react';
import './App.css';

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            displayValue: '0',
            operator: null,
            waitingForOperand: false
        };
    }

    inputDigit(digit) {
        const { displayValue, waitingForOperand } = this.state
        
        if (waitingForOperand) {
          this.setState({
            displayValue: String(digit),
            waitingForOperand: false
          })
        } else {
          this.setState({
            displayValue: displayValue === '0' ? String(digit) : displayValue + digit
          })
        }
      }

    performOperation(nextOperator) {
        const { value, displayValue, operator } = this.state
        const inputValue = parseFloat(displayValue)
        
        if (value == null) {
            this.setState({
                value: inputValue
            })
        } else if (operator) {
            const currentValue = value || 0
            const newValue = CalculatorOperations[operator](currentValue, inputValue)
          
            this.setState({
                value: newValue,
                displayValue: String(newValue)
            })
        }
        
        this.setState({
            waitingForOperand: true,
            operator: nextOperator
        })
    }

    clearAll() {
        this.setState({
            value: null,
            displayValue: '0',
            operator: null
        })
    }

    render() {
        const { displayValue } = this.state

        return (
            <div>
                <form name="form">
                  <div className="display">
                    <input type="text" placeholder="0" name="displayResult" value={displayValue} readOnly/>
                  </div>
                  <div className="buttons">
                      <div className="row">
                        <input type="button" name="b7" value="7" onClick={() => this.inputDigit(7)}/>
                        <input type="button" name="b8" value="8" onClick={() => this.inputDigit(8)}/>
                        <input type="button" name="b9" value="9" onClick={() => this.inputDigit(9)}/>
                        <input type="button" name="addb" value="+" onClick={() => this.performOperation('+')}/>
                      </div>
                      
                      <div className="row">
                        <input type="button" name="b4" value="4" onClick={() => this.inputDigit(4)}/>
                        <input type="button" name="b5" value="5" onClick={() => this.inputDigit(5)}/>
                        <input type="button" name="b6" value="6" onClick={() => this.inputDigit(6)}/>
                        <input type="button" name="subb" value="-" onClick={() => this.performOperation('-')}/>
                      </div>
                      
                      <div className="row">
                        <input type="button" name="b1" value="1" onClick={() => this.inputDigit(1)}/>
                        <input type="button" name="b2" value="2" onClick={() => this.inputDigit(2)}/>
                        <input type="button" name="b3" value="3" onClick={() => this.inputDigit(3)}/>
                        <input type="button" name="mulb" value="*" onClick={() => this.performOperation('*')}/>
                      </div>
                      
                      <div className="row">
                        <input type="button" name="b0" value="0" onClick={() => this.inputDigit(0)}/>
                        <input type="button" name="divb" value="/" onClick={() => this.performOperation('/')}/>
                        <input type="button" name="clear-btn" value="C" onClick={() => this.clearAll()} />
                        <input type="button" className="red" value="=" onClick={() => this.performOperation('=')}/>
                      </div>
                  </div>
                </form>
            </div>
        );
    }
}

export default App;
