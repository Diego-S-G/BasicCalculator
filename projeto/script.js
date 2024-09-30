const result = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

let currentNumber = "";
let firstNumericalOperator = null;
let mathematicalOperator = null;
let restart = false;

function updateResult(originClear = false) {
    let displayValue = originClear ? '0' : currentNumber.replace('.', ',');

    if (displayValue.length > 12) {
        let number = parseFloat(currentNumber);
        displayValue = number.toExponential(5).replace('.', ',');
    }

    result.innerText = displayValue;
}

function addDigit(digit) {
    if (digit === '.') {
        if (restart) {
            currentNumber = '0.';
        } else if (!currentNumber.includes('.')) {
            currentNumber = currentNumber || '0';
            currentNumber += '.';
        }
    } else {
        if (restart) {
            currentNumber = digit;
        } else {
            currentNumber += digit;
        }
    }

    restart = false;
    updateResult();
}

function setOperator(newMathOperator) {
    if (currentNumber) {
        calculate();

        firstNumericalOperator = parseFloat(currentNumber);
        currentNumber = '';
    }

    mathematicalOperator = newMathOperator;

}

function calculate() {
    if (mathematicalOperator === null || firstNumericalOperator === null) {
        return;
    }

    let secondNumericalOperator = parseFloat(currentNumber);
    let finalValue;

    switch (mathematicalOperator) {
        case '+':
            finalValue = firstNumericalOperator + secondNumericalOperator;
            break;
        case '-':
            finalValue = firstNumericalOperator - secondNumericalOperator;
            break;
        case 'x':
            finalValue = firstNumericalOperator * secondNumericalOperator;
            break;
        case '÷':
            finalValue = firstNumericalOperator / secondNumericalOperator;
            break;

        default:
            return;
    }

    currentNumber = finalValue.toString();

    mathematicalOperator = null;
    firstNumericalOperator = null;
    restart = true;
    updateResult();
}

function clearCalculator() {
    currentNumber = '';
    firstNumericalOperator = null;
    mathematicalOperator = null;
    updateResult(true);
}

function setPercentage() {
    let baseValue = parseFloat(currentNumber);

    let percentageResult = baseValue / 100;

    currentNumber = percentageResult.toString();

    updateResult();

    restart = true;
}

function toggleSign() {
    currentNumber = (
        parseFloat(currentNumber || firstNumericalOperator) * -1
    ).toString();
    updateResult();
}


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText.trim();

        if (/^[0-9]+$/.test(buttonText)) {
            addDigit(buttonText);
        } else if (['+', '-', 'x', '÷'].includes(buttonText)) {
            setOperator(buttonText);
        } else if (buttonText === '=') {
            calculate();
        } else if (buttonText === 'AC') {
            clearCalculator();
        } else if (buttonText === '±') {
            toggleSign();
        } else if (buttonText === '%') {
            setPercentage();
        } else if (buttonText === '.') {
            addDigit(buttonText);
        }
    });
});