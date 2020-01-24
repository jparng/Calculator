
const calculator = {  // stores the keys in the variable "calculator".
    displayValue: "0",
    fistOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};



function inputNumber(){  //Displays the value that is input from the buttons.
    const display = document.querySelector('.Value');
    display.value = calculator.displayValue;
    return ;
}
inputNumber();

const keys = document.querySelector('.numbers');
keys.addEventListener('click', (event) => {
    const {target} = event; // same as const target = event.target;
    if(!target.matches('button')){ // this means that if the element isn't a button, exit the function.
        return;
    }
    if(target.classList.contains('operator')){  //When an operator is clicked,the function for the operator will run.
        operateHandle(target.value);
        inputNumber();
        return;
    }
    if(target.classList.contains('decimal')){ //Runs the decimal function when the button is clicked
        inputDecimal(target.value);
        inputNumber();
        return;
    }
    if(target.classList.contains('all-clear')){
       resetCalculator();
       inputNumber();
        return;
    }
    if(target.classList.contains('delete')){
        del(target.value);
        inputNumber();
        return;
    }
    inputDigit(target.value);
    inputNumber();
});

function inputDigit(digit){
    const {displayValue, waitingForSecondOperand} = calculator;
    if(waitingForSecondOperand === true){  //When an operator is running after the first operand is hit, display the second operand only. 
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } 
    else{
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit; // Else, it will concatenate the numbers that are displayed
    }
    console.log(calculator);
}

function inputDecimal(dot){
    if(calculator.waitingForSecondOperand === true) return; // Makes sure decimal won't be added after clicking on an operator.

    if (!calculator.displayValue.includes(dot)) {      // If there is no dot, add one, if there is, don't add one.
        calculator.displayValue += dot;
    }
}

function operateHandle(nextOperator){
    const {firstOperand, displayValue, operator} = calculator; // This time, calls the 3 keys from the variable, making a "copy" for each one.
    const inputValue = parseFloat(displayValue); // Makes sure that the input value is not a string, but an integer.
if( operator && calculator.waitingForSecondOperand){
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
}

    if(firstOperand == null){
        calculator.firstOperand = inputValue;
    }else if(operator){  // checks if an operator already exists, then we will look up the operator and match the executed operator.
        const result = performCalculation[operator](firstOperand, inputValue); // When the calculation from 2 operands finish,
        
        calculator.displayValue = String(result.toFixed(2));                               // display the result in the firstOperand value.
        calculator.firstOperand = result.toFixed(2);
      if(operator == "/"){
          if(firstOperand == 0 || result == Infinity || result == NaN){
              alert("Undefined");
              resetCalculator();
              return;
          }
      }
      
    }

    calculator.waitingForSecondOperand = true;  
    calculator.operator = nextOperator;
    console.log(calculator);
    
} 
const performCalculation = { // the variable that has the keys, where the operator will add, subtract, multiply, divide, and then combine them with equals.
    '/' : (firstOperand, secondOperand) => firstOperand / secondOperand,

    '+' : (firstOperand, secondOperand) => firstOperand + secondOperand,

    '-' : (firstOperand, secondOperand) => firstOperand - secondOperand,

    '*' : (firstOperand, secondOperand) => firstOperand * secondOperand,

    '=' : (firstOperand, secondOperand) => secondOperand

};

function resetCalculator(){
    calculator.displayValue = '0';
    calculator.firstOperand =  null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function del(){
    if(calculator.displayValue !== "0"){
        if(calculator.displayValue[calculator.displayValue.length - 1] === '.') inputDecimal();
        let newDisplayValue = (calculator.displayValue.slice(0, -1));
        if(newDisplayValue.length === 0) newDisplayValue = '0';
        calculator.displayValue = '0';
        inputDigit(newDisplayValue);
    }
}