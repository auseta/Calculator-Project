function clearCalculator() {
  previousValue = "";
  currentValue = "";
  operator = "";
  negativeValue = "";
  previousValueScreen.textContent = "";
  currentValueScreen.textContent = "";
}

function float() {
  if (currentValue.includes(".")) {
    return;
  } else {
    currentValue += ".";
    currentValueScreen.textContent = currentValue;
  }
}

function setNegative() {
  console.log("paso algo...");
  if (currentValueScreen.textContent[0] === undefined) {
    currentValue = "-";
    currentValueScreen.textContent = currentValue;
  }
}

function delNumber() {
  if (currentValueScreen.textContent !== "") {
    let arrCurrentValue = currentValue.split("");
    arrCurrentValue.pop()
    currentValue = arrCurrentValue.join("");
    currentValueScreen.textContent = currentValue
  }
}

function checkOperator(e) {
  if (operator !== "" && previousValue !== "" && currentValue !== "") {
    if (operator === "+") {
      previousValue = +previousValue + +currentValue;
    }
    if (operator === "-") {
      previousValue = +previousValue - +currentValue;
    }
    if (operator === "*") {
      previousValue = +previousValue * +currentValue;
    }
    if (operator === "/") {
      if (currentValue === "0") {
        currentValue = "";
        previousValue = "";
        previousValueScreen.textContent = "";
        currentValueScreen.textContent = "ERROR"
        return
      }
      previousValue = +previousValue / +currentValue;
    }
    operator = e.target.value
    previousValueScreen.textContent = `${previousValue} ${operator}`;
    currentValueScreen.textContent = "";
    currentValue = "";
  }
}

function displayError() {
  currentValue = "";
  previousValue = "";
  previousValueScreen.textContent = "";
  currentValueScreen.textContent = "ERROR"
}

function operate() {
  if (operator === "+") {
    previousValue = +previousValue + +currentValue;
  }
  if (operator === "-") {
    previousValue = +previousValue - +currentValue;
  }
  if (operator === "*") {
    previousValue = +previousValue * +currentValue;
  }
  if (operator === "/") {
    if (currentValue === "0") {
      displayError()
      return
    } else {
      previousValue = +previousValue / +currentValue;
    }
  }
  previousValueScreen.textContent = "";
  currentValueScreen.textContent = previousValue
  operator = "";
  previousValue = "";
  currentValue = "";
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
const negative = document.querySelector("#negative");
const del = document.querySelector("#delete");
const onOff = document.querySelector("#on-off");

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
    checkOperator(e);
    operator = e.target.value;
    if (
      (operator === "+" ||
        operator === "/" ||
        operator === "*" ||
        operator === "-") &&
      currentValue === ""
    ) {
      return;
    }
    previousValue = currentValue;
    currentValue = "";
    negativeValue = "";
    previousValueScreen.textContent = `${previousValue} ${operator}`;
    currentValueScreen.textContent = "";
  });
});

clear.addEventListener("click", clearCalculator);

equal.addEventListener("click", operate);

decimal.addEventListener("click", float);

negative.addEventListener("click", setNegative)

del.addEventListener("click", delNumber);