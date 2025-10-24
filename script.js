class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetScreen = false;
        this.isScientificMode = false;

        this.resultDisplay = document.getElementById('result');
        this.expressionDisplay = document.getElementById('expression');
        this.basicModeBtn = document.getElementById('basicModeBtn');
        this.scientificModeBtn = document.getElementById('scientificModeBtn');
        this.basicButtons = document.querySelector('.basic-mode');
        this.scientificButtons = document.querySelector('.scientific-mode');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Button click handlers
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', () => {
                if (button.dataset.value) {
                    this.appendNumber(button.dataset.value);
                } else if (button.dataset.action) {
                    this.handleAction(button.dataset.action);
                }
            });
        });

        // Mode toggle handlers
        this.basicModeBtn.addEventListener('click', () => this.switchMode('basic'));
        this.scientificModeBtn.addEventListener('click', () => this.switchMode('scientific'));
    }

    switchMode(mode) {
        if (mode === 'basic') {
            this.isScientificMode = false;
            this.basicModeBtn.classList.add('active');
            this.scientificModeBtn.classList.remove('active');
            this.basicButtons.style.display = 'grid';
            this.scientificButtons.style.display = 'none';
        } else {
            this.isScientificMode = true;
            this.scientificModeBtn.classList.add('active');
            this.basicModeBtn.classList.remove('active');
            this.basicButtons.style.display = 'none';
            this.scientificButtons.style.display = 'grid';
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) return;

        if (this.shouldResetScreen) {
            this.currentValue = number === '.' ? '0.' : number;
            this.shouldResetScreen = false;
        } else {
            this.currentValue = this.currentValue === '0' ? number : this.currentValue + number;
        }

        this.updateDisplay();
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'percent':
                this.percentage();
                break;
            case 'equals':
                this.equals();
                break;
            case 'sqrt':
                this.squareRoot();
                break;
            case 'pow':
                this.square();
                break;
            case 'sin':
                this.sine();
                break;
            case 'cos':
                this.cosine();
                break;
            case 'tan':
                this.tangent();
                break;
            case 'log':
                this.logarithm();
                break;
        }
    }

    setOperation(operator) {
        if (this.operation !== null && !this.shouldResetScreen) {
            this.equals();
        }

        this.operation = operator;
        this.previousValue = this.currentValue;
        this.shouldResetScreen = true;
        this.updateExpression();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetScreen = false;
        this.updateDisplay();
        this.updateExpression();
    }

    backspace() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }

    percentage() {
        this.currentValue = (parseFloat(this.currentValue) / 100).toString();
        this.updateDisplay();
    }

    equals() {
        if (this.operation === null || this.shouldResetScreen) return;

        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        let result;
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current === 0 ? 'Error' : prev / current;
                break;
            default:
                return;
        }

        this.currentValue = result.toString();
        this.operation = null;
        this.previousValue = '';
        this.shouldResetScreen = true;
        this.updateDisplay();
        this.updateExpression();
    }

    // Scientific functions
    squareRoot() {
        const value = parseFloat(this.currentValue);
        if (value < 0) {
            this.currentValue = 'Error';
        } else {
            this.currentValue = Math.sqrt(value).toString();
        }
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    square() {
        const value = parseFloat(this.currentValue);
        this.currentValue = (value * value).toString();
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    sine() {
        const value = parseFloat(this.currentValue);
        // Convert to radians (assuming input is in degrees)
        this.currentValue = Math.sin(value * Math.PI / 180).toString();
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    cosine() {
        const value = parseFloat(this.currentValue);
        // Convert to radians (assuming input is in degrees)
        this.currentValue = Math.cos(value * Math.PI / 180).toString();
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    tangent() {
        const value = parseFloat(this.currentValue);
        // Convert to radians (assuming input is in degrees)
        this.currentValue = Math.tan(value * Math.PI / 180).toString();
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    logarithm() {
        const value = parseFloat(this.currentValue);
        if (value <= 0) {
            this.currentValue = 'Error';
        } else {
            this.currentValue = Math.log10(value).toString();
        }
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    updateDisplay() {
        this.resultDisplay.textContent = this.currentValue;
    }

    updateExpression() {
        if (this.operation && this.previousValue) {
            const operatorSymbol = {
                '+': '+',
                '-': '−',
                '*': '×',
                '/': '÷'
            }[this.operation];
            this.expressionDisplay.textContent = `${this.previousValue} ${operatorSymbol}`;
        } else {
            this.expressionDisplay.textContent = '';
        }
    }

    handleKeyboard(key) {
        if (key >= '0' && key <= '9' || key === '.') {
            this.appendNumber(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            this.setOperation(key);
        } else if (key === 'Enter' || key === '=') {
            this.equals();
        } else if (key === 'Backspace') {
            this.backspace();
        } else if (key === 'Escape') {
            this.clear();
        } else if (key === '%') {
            this.percentage();
        }
    }
}

// Add operator button listeners after basic initialization
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();

    // Add operator listeners
    document.querySelectorAll('.btn.operator').forEach(button => {
        button.addEventListener('click', () => {
            calculator.setOperation(button.dataset.value);
        });
    });

    // Add keyboard support
    document.addEventListener('keydown', (e) => {
        calculator.handleKeyboard(e.key);
    });
});
