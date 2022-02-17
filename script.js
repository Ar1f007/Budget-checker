// Getting all the elements related to income-expenses
const form = document.querySelector('form');
const incomeInput = document.querySelector('#income');
const foodInput = document.querySelector('#food');
const rentInput = document.querySelector('#rent');
const clothesInput = document.querySelector('#clothes');
const totalExpensePlaceholder =
  document.querySelector('#total-expense').firstElementChild;
const balancePlaceholder = document.querySelector('#balance').firstElementChild;

// SPECIFIC TO SAVINGS
const savingsInput = document.querySelector('#save');
const budgetInfoEl = document.querySelector('#budget-info');

const savingsAmountPlaceholder =
  document.querySelector('#saving-amount').firstElementChild;
const remainingBalancePlaceholder =
  document.querySelector('#remaining-balance').firstElementChild;

// BUTTONS
const calculateBtn = document.querySelector('#calculate');
const saveBtn = document.querySelector('#save-btn');
const clearBtn = document.querySelector('#clear');

// INITIAL VALUE
let incomeAmount = null,
  foodCost = null,
  rentCost = null,
  clothesCost = null,
  balance = null,
  timer = null;

// ON FORM SUBMIT / CLICKED ON CALCULATE
function handleSubmit(e) {
  e.preventDefault();

  totalExpensePlaceholder.textContent = '';
  balancePlaceholder.textContent = '';

  // REMOVE ANY PREVIOUS ERRORS FROM THE DOM ON FORM SUBMIT
  removePreviousError();

  getTheInput();

  // CHECKING IF THE VALUES ARE VALID - then proceeds
  if (isValid(incomeAmount, foodCost, rentCost, clothesCost)) {
    calculateTotalExpenseAndBalance();
  }
}

// REMOVES ANY PREVIOUS ERRORS
function removePreviousError() {
  const errors = Array.from(document.querySelectorAll('.error'));

  if (errors) {
    for (const error of errors) {
      clearTimeout(timer);
      error.remove();
    }
  }
}

// GET THE INPUT FROM EXPENSES AND INCOME FIELDS
function getTheInput() {
  incomeAmount = incomeInput.value;
  foodCost = foodInput.value;
  rentCost = rentInput.value;
  clothesCost = clothesInput.value;
}

// CHECKS THE VALIDITY OF INPUTS - shows output accordingly
// return true indicating inputs are valid, and false indicates not valid
/* 1. isNaN() for checking if the values are number or not
   2. input < 0 for checking if given input is negative
   3. input == '' for, incase no input is provided
*/
function isValid() {
  const inputs = arguments;
  for (const input of inputs) {
    if (isNaN(input) || input < 0 || input === '') {
      if (isNaN(input)) {
        showError(form, 'Please enter a number input value');
      } else if (input < 0) {
        showError(form, 'Please enter a number input greater than 0(zero)');
      } else {
        showError(form, 'Please provide inputs');
      }
      return false;
    }
  }

  return true;
}

// CALCULATES TOTAL EXPENSE AND BALANCE AND SHOWS OUTPUT TO THE PAGE
function calculateTotalExpenseAndBalance() {
  const totalExpenses =
    Number(foodCost) + Number(rentCost) + Number(clothesCost);
  if (totalExpenses) {
    totalExpensePlaceholder.textContent = totalExpenses;
  }

  if (totalExpenses > incomeAmount) {
    incomeAmount = 0;
    showError(form, 'Expenses exceeded the income amount! 💣');
  } else {
    balance = Number(incomeAmount) - totalExpenses;

    if (balance !== undefined) {
      balancePlaceholder.textContent = balance;
    }
  }
}

// HANDLES SHOWING ERROR
function showError(parent, msg) {
  const p = document.createElement('p');
  p.classList.add('error');
  p.textContent = msg;

  parent.appendChild(p);

  // REMOVE ERRORS AFTER 4 SECONDS
  timer = setTimeout(() => {
    removeError(parent);
  }, 4000);
}

// REMOVES THE ERROR FROM PAGE IF THERE IS ANY
function removeError(parent) {
  const errorEl = parent.querySelector('.error');
  if (errorEl) {
    errorEl.remove();
  }
}

// CALCULATE SAVINGS - SAVING AMOUNT AND REMAINING BALANCE - SHOWS VALUE TO THE PAGE
function calculateSavings() {
  removePreviousError();
  savingsAmountPlaceholder.textContent = '';
  remainingBalancePlaceholder.textContent = '';

  const savingsPercentage = savingsInput.value;
  if (isValid(savingsPercentage)) {
    const savingAmount = (savingsPercentage * incomeAmount) / 100;

    if (savingAmount > balance || savingAmount == 0) {
      showError(budgetInfoEl, 'Insufficient amount');
      return;
    }

    if (savingAmount) {
      savingsAmountPlaceholder.textContent = savingAmount;
      remainingBalancePlaceholder.textContent = balance - savingAmount;
    }
  }
}

// CLEARING ALL THE VALUES/PLACEHOLDERS
function clearInput(e) {
  e.preventDefault();
  incomeInput.value = '';
  foodInput.value = '';
  rentInput.value = '';
  clothesInput.value = '';
  savingsInput.value = '';
  totalExpensePlaceholder.textContent = '';
  balancePlaceholder.textContent = '';
  savingsAmountPlaceholder.textContent = '';
  remainingBalancePlaceholder.textContent = '';
}

// EVENT LISTENERS
calculateBtn.addEventListener('click', handleSubmit);
saveBtn.addEventListener('click', calculateSavings);
clearBtn.addEventListener('click', clearInput);
