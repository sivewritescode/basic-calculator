//Functions for all basic operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "ZeroDivisionError!";
  } else {
    return a / b;
  }
}

//Variable for each part of an operation
let firstNumber = "";
let operatorSelected;
let secondNumber = "";

//State flags:
let isOperatorSelected = false; //State flag for if an operator is clicked.
let clearDisplay = false; //State flag for if the display should be cleared.

//Function that determines which operation is current
function operate(a, operator, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
  }
}

const display = document.querySelector("#calculator-display-text");

const buttons = document.querySelectorAll(".number-button");

//Event handler for when a number button is clicked.
for (let button of buttons) {

  button.addEventListener("click", () => {

    //Code that determines whether firstNumber or secondNumber gets appended.
    if (!isOperatorSelected) {
      firstNumber += button.textContent; //Append firstNumber with number clicked.
      display.textContent += button.textContent;
    } else if (isOperatorSelected) {

      //This removes the input for firstNumber before input for secondNumber is displayed.
      if (clearDisplay) {
        display.textContent = "";
        clearDisplay = false;
      }

      secondNumber += button.textContent; 
      display.textContent += button.textContent;
      isOperatorSelected = false;
    }
  });

}

const operators = document.querySelectorAll(".operator-button");

//Event handler for when an operator button is clicked.
for (let operator of operators) {

  operator.addEventListener("click", () => {

    if (!operatorSelected) {
      isOperatorSelected = true;
      clearDisplay = true;
      operatorSelected = operator.textContent;
    } else {
      isOperatorSelected = true;
      clearDisplay = true;
      let resultOfOperation = operate(+firstNumber, operatorSelected, +secondNumber);
      display.textContent = resultOfOperation;
      firstNumber = resultOfOperation;
      operatorSelected = operator.textContent;
      secondNumber = "";
    }
  });
}

const equalOperatorButton = document.querySelector("#equal-operator-button");

//Function that handles an operation when the equal operator is clicked.
equalOperatorButton.addEventListener("click", () => {

  //Execute only when there is a full expression.
  if (secondNumber) {
    let resultOfOperation = operate(+firstNumber, operatorSelected, +secondNumber);
    display.textContent = resultOfOperation;
    firstNumber = resultOfOperation;
    operatorSelected = "";
    secondNumber = "";
  }
});

const clearButton = document.querySelector("#clear-button");

//Event handler for when the clear button is clicked.
clearButton.addEventListener("click", () => {
  display.textContent = "";
  firstNumber = "";
  operatorSelected = "";
  secondNumber = "";
  isOperatorSelected = false;
  clearDisplay = false;
});