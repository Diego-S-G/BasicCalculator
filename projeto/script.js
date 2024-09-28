const result = document.querySelector('.result');
const buttons = document.querySelectorAll('.buttons button');

let currentNumber = "";
let firstOpe = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
    result.innerText = originClear ? 0 : currentNumber.replace('.', ',');
}

function addDigit(digit) {
    if (addDigit === ',' && (currentNumber.includes(',') || !currentNumber)) {
        return;
    }

    if (restart) {
        currentNumber = digit;
        restart = false;
    }
    else {
        currentNumber += digit;
    }

    updateResult();
}

function setOperator(newOpe) {
    if (currentNumber) {
        calculate();

        firstOpe = parseFloat(currentNumber.replace(',', '.'));
        currentNumber = '';
    }

    operator = newOpe;
}

function calculate() {
    if (operator === null || firstOpe === null) {
        return result;
    }

    let secondOpe = parseFloat(currentNumber.replace(',', '.'));
    let finalValue;

    switch (operator) {
        case '+':
            finalValue = firstOpe + secondOpe;
            break;
        case '-':
            finalValue = firstOpe - secondOpe;
            break;
        case 'x':
            finalValue = firstOpe * secondOpe;
            break;
        case '÷':
            finalValue = firstOpe / secondOpe;
            break;

        default:
            return;
    }

    if (finalValue.toString().split('.')[1]?.length > 5) {
        currentNumber = parseFloat(finalValue.toFixed(5).toString());
    }
    else {
        currentNumber = finalValue.toString();
    }

    operator = null;
    firstOpen = null;
    restart = true;
    updateResult();
}

function clearCalculator() {
    currentNumber = '';
    firstOpe = null;
    operator = null;
    updateResult(true);
}

function setPercentage() {
    let percentageResult = parseFloat(currentNumber) / 100;

    if (['+', '-'].includes(operator)) {
        percentageResult = percentageResult * (firstOpe || 1);
    }

    if (percentageResult.toString().split('.')[1]?.length > 5) {
        percentageResult = percentageResult.toFixed(5).toString();
    }

    currentNumber = percentageResult.toString();
    updateResult();
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;

        if (/^[0-9]+$/.test(buttonText)) {
            addDigit(buttonText);
        }
        else if (['+', '-', 'x', '÷'].includes(buttonText)) {
            setOperator(buttonText);
        }
        else if (buttonText === '=') {
            calculate();
        }
        else if (buttonText === 'C') {
            clearCalculator();
        }
        else if (buttonText === '±') {
            currentNumber = (
                parseFloat(currentNumber || firstOpe) * -1
            ).toString();

            updateResult();
        }
        else if (buttonText === '%') {
            setPercentage();
        }
    })
})