var numbers = [];
var operators = [];
var currentNumber = '0';
var operationMode = false;

window.addEventListener('DOMContentLoaded', init);

function init() {
    Array.from(document.getElementsByClassName('btn'))
        .forEach(btn => {
            btn.addEventListener('click', () => handleButtonPress(btn.id) )
        });
}

function handleButtonPress(btnId) {
    if (btnId === 'dot') {
        currentNumber += '.';
    } else if (btnId === 'clear') {
        clearPress();
    } else if (!isNaN(Number.parseInt(btnId))) {
        numberPress(btnId);
    } else {
        operatorPress(btnId);
    }
}

function clearPress() {
    updateDisplay();
    reset();
}

function reset(num = '0') {
    numbers = [];
    operators = [];
    currentNumber = num;
}

function numberPress(num) {
    currentNumber === '0' ? currentNumber = num : currentNumber += num;
    updateDisplay(currentNumber);
    operationMode = true;
}

function operatorPress(op) {
    if (!operationMode) {
        return
    }

    operators.push(op);
    numbers.push(currentNumber);

    if (op === 'equal') {
        currentNumber = calculate();
        updateDisplay(currentNumber);
        reset(currentNumber);
    } else {
        currentNumber = '0';
        updateDisplay();
        operationMode = false;
    }
}

function calculate() {
    // Perform calculation
    var total = 0;

    for (var i = 0; i < numbers.length; i++) {
        if (i === 0) {
            total = Number.parseFloat(numbers[i]);
        } else {
            total = operate(total, Number.parseFloat(numbers[i]), operators[i-1]);
        }
    }

    return `${total}`;
}

function operate(val1, val2, op) {
    switch (op) {
        case 'add':
            return val1 + val2;
        case 'subtract':
            return val1 - val2;
        case 'multiply':
            return val1 * val2;
        case 'divide':
            return val1 / val2;
        default:
            return '0';
    }
}

function updateDisplay(num = '0') {
    const digitCount = num.length;
    const displayEl = document.getElementById('display');

    // Up to max display
    if (digitCount >= 11 && digitCount < 16) {
        displayEl.style.fontSize = '20px';
    } else if (digitCount >= 16) {
        displayEl.style.fontSize = '15px';
    } else {
        displayEl.style.fontSize = '30px';
    }

    // Revisit
    displayEl.innerText = num;
}
