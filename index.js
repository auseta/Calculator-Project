function clearCalculator() {
  previousValue = "";
  currentValue = "";
  operator = "";
  previousValueScreen.textContent = "";
  currentValueScreen.textContent = "";
}

function add(num1, num2) {
  num2 = `${+num1 + +num2}`
  num1 = "";
  currentValueScreen.textContent = num2;
  previousValueScreen.textContent = num1;
}

function subtract(num1, num2) {
  currentValueScreen.textContent = `${+num1 - +num2}`;
  previousValueScreen.textContent = num2;
}

function multiply(num1, num2) {
  currentValueScreen.textContent = `${+num1 * +num2}`;
  previousValueScreen.textContent = num2;
}

function divide(num1, num2) {
  num2 = `${+num1 / +num2}`;
  currentValueScreen.textContent = num2
}

function operate() {
  if (operator === "+") {
    add(previousValue, currentValue);
  }
  if (operator === "-") {
    subtract(previousValue, currentValue);
    currentValue = "";
    previousValueScreen.textContent = currentValue;
  }
  if (operator === "*") {
    multiply(previousValue, currentValue);
    currentValue = "";
    previousValueScreen.textContent = currentValue;
  }
  if (operator === "/") {
    divide(previousValue, currentValue);
    currentValue = "";
    previousValueScreen.textContent = currentValue;
  }
}

function float() {
  if (currentValue.includes(".")) {
    return
  } else {
    currentValue +="."
    currentValueScreen.textContent = currentValue;
  }
}

let previousValue = "";
let currentValue = "";
let operator = "";

// screen values
const previousValueScreen = document.querySelector(".previous-value");
const currentValueScreen = document.querySelector(".current-value");

// buttons ( numbers & operators )
const numbers = document.querySelectorAll("button[data-button-type='number']");
const operators = document.querySelectorAll(
  "button[data-button-type='operator']"
);

// buttons ( actions )
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const decimal = document.querySelector("#decimal");

// logic
numbers.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (currentValue.length < 8) {
      currentValue += e.target.value;
      currentValueScreen.textContent = currentValue;
    }
  });
});

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    operator = e.target.value;
    if (operator === "-" && currentValue === "") {
      currentValue = operator;
      currentValueScreen.textContent += currentValue;
    } 
    if ((operator === "+" || operator === "/" || operator === "*") && (currentValue === "-" || currentValue === "")) {
      return;
    } 
    if (currentValue === "-") {
      return;
    }
    previousValue = currentValue;
    previousValueScreen.textContent = `${previousValue} ${operator}`;
    currentValue = "";
    currentValueScreen.textContent = "";
  });
});

clear.addEventListener("click", clearCalculator);

equal.addEventListener("click", operate);

decimal.addEventListener("click", float)