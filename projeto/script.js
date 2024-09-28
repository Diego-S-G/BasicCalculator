const result = document.querySelector('.visor');
const buttons = document.querySelectorAll('.buttons button');

let currentNumber = "";
let firstNumericalOperator = null;
let mathematicalOperator = null;
let restart = false;

function updateResult(originClear = false) {
    let displayValue = originClear ? '0' : currentNumber.replace('.', ',');

    if (displayValue.length > 12) {
        let number = parseFloat(currentNumber.replace(',', '.'));
        displayValue = number.toExponential(5).replace('.', ',').replace('e', 'e');
    }

    result.innerText = displayValue;
}

function addDigit(digit) {
    if (digit === ',') {

        if (!currentNumber) {
            currentNumber = '0,';
        } else if (!currentNumber.includes(',')) {
            currentNumber += ',';
        }
    } else {
        if (restart) {
            currentNumber = digit;
            restart = false;
        } else {
            currentNumber += digit;
        }
    }

    updateResult();
}

function setOperator(newMathOperator) {
    if (currentNumber) {
        calculate();

        firstNumericalOperator = parseFloat(currentNumber.replace(',', '.'));
        currentNumber = '';
    }

    mathematicalOperator = newMathOperator;

}

function calculate() {
    if (mathematicalOperator === null || firstNumericalOperator === null) {
        return;
    }

    let secondNumericalOperator = parseFloat(currentNumber.replace(',', '.'));
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
    let baseValue = parseFloat(currentNumber.replace(',', '.'));

    let percentageResult = baseValue / 100;

    currentNumber = percentageResult.toString().replace('.', ',');

    updateResult();

    restart = true;
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
            currentNumber = (
                parseFloat(currentNumber || firstNumericalOperator) * -1
            ).toString();
            updateResult();
        } else if (buttonText === '%') {
            setPercentage();
        } else if (buttonText === ',') {
            addDigit(',');
        }
    });
});