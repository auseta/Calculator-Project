function handleNumber(number) {
  if (previousValue !== "" && currentValue !== "" && operator !== "") {
    previousValue = "";
    currentDisplayNumber.textContent = currentValue;
  }
  if (currentValue.length < 8) {
    currentValue += number;
    currentDisplayNumber.textContent = currentValue;
  }
}

function handleOperator(op) {
  if (previousValue === "") {
    previousValue = currentValue;
    checkOperator(op)
  } else if (currentValue === "") {
    checkOperator(op)
  } else {
    operate();
    operator = op;
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = `${previousValue} ${operator}`
  }
}

function checkOperator(op) {
  operator = op;
  previousDisplayNumber.textContent = `${previousValue} ${operator}`;
  currentDisplayNumber.textContent = "0";
  currentValue = "";
}

function operate () {
  previousValue = +previousValue;
  currentValue = +currentValue;

  if (operator === "+") {
    previousValue +=currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "*") {
    previousValue *= currentValue;
  } else if (operator === "/") {
    if (currentValue === 0) {
      previousValue = "Error";
      displayResult()
      return
    }
    previousValue /= currentValue;
  }
  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  displayResult()
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000
}

function displayResult() {
  if (previousValue.length < 8) {
    currentDisplayNumber.textContent = previousValue;
  } else {
    currentDisplayNumber.textContent = `${previousValue.slice(0, 8)}...`
  }
  previousDisplayNumber.textContent = "";
  operator = "";
  currentValue = "";
}

function clearCalculator() {
  currentValue = "";
  previousValue = "";
  operator = "";
  previousDisplayNumber.textContent = "0";
  currentDisplayNumber.textContent = "";
}



function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue +="."
    currentDisplayNumber.textContent = currentValue
  }
}

let currentValue = "";
let previousValue = "";
let operator = "";

const previousDisplayNumber = document.querySelector(".calculator-operation");
const currentDisplayNumber = document.querySelector(".calculator-result");

const equal = document.querySelector("#equal");
const decimal = document.querySelector("#decimal");
const clear = document.querySelector("#clear");
const operators = document.querySelectorAll("button[data-button-type='operator']")

const numberButtons = document.querySelectorAll("button[data-button-type='number']")

numberButtons.forEach( button => {
  button.addEventListener("click", (e) => {
    handleNumber(e.target.value)
  })
})

operators.forEach( button => {
  button.addEventListener("click", (e) => {
    handleOperator(e.target.value);
  })
})

equal.addEventListener("click", () => {
  if (previousValue !== "" && currentValue !== "") {
    operate()
  }
})

clear.addEventListener("click", clearCalculator)

decimal.addEventListener("click", () => {
  addDecimal()
})