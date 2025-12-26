let currentNum = '0';
let prevNum = '';
let operation = undefined;

const currentDisplay = document.getElementById('current-action');
const prevDisplay = document.getElementById('prev-action');

function updateUI() {
    currentDisplay.innerText = currentNum;
    if (operation != null) {
        prevDisplay.innerText = `${prevNum} ${operation}`;
    } else {
        prevDisplay.innerText = '';
    }
}

function addNum(number) {
    if (number === '.' && currentNum.includes('.')) return;
    if (currentNum === '0' && number !== '.') {
        currentNum = number.toString();
    } else {
        currentNum = currentNum.toString() + number.toString();
    }
    updateUI();
}

function setOp(op) {
    if (currentNum === '') return;
    if (prevNum !== '') {
        calculate();
    }
    operation = op;
    prevNum = currentNum;
    currentNum = '0';
    updateUI();
}

function calculate() {
    let result;
    const prev = parseFloat(prevNum);
    const current = parseFloat(currentNum);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '×': result = prev * current; break;
        case '÷': 
            if (current === 0) {
                alert("Cannot divide by zero");
                clearAll();
                return;
            }
            result = prev / current; 
            break;
        default: return;
    }

    currentNum = result.toString();
    operation = undefined;
    prevNum = '';
    updateUI();
}

function clearAll() {
    currentNum = '0';
    prevNum = '';
    operation = undefined;
    updateUI();
}

function deleteLast() {
    currentNum = currentNum.toString().slice(0, -1);
    if (currentNum === '') currentNum = '0';
    updateUI();
}