const form = document.querySelector('form');
const incomeInput = document.querySelector('#income');
const foodInput = document.querySelector('#food');
const rentInput = document.querySelector('#rent');
const clothesInput = document.querySelector('#clothes');
const totalExpensePlaceholder =
  document.querySelector('#total-expense').firstElementChild;
const balancePlaceholder = document.querySelector('#balance').firstElementChild;

const savingsInput = document.querySelector('#save');
const budgetInfoEl = document.querySelector('#budget-info');

const savingsAmountPlaceholder =
  document.querySelector('#saving-amount').firstElementChild;
const remainingBalancePlaceholder =
  document.querySelector('#remaining-balance').firstElementChild;

const calculateBtn = document.querySelector('#calculate');
const saveBtn = document.querySelector('#save-btn');
const clearBtn = document.querySelector('#clear');

let incomeAmount = null,
  foodCost = null,
  rentCost = null,
  clothesCost = null,
  balance = null;

function handleSubmit(e) {
  e.preventDefault();

  totalExpensePlaceholder.textContent = '';
  balancePlaceholder.textContent = '';
  removePreviousError();

  getTheInput();

  if (isValid(incomeAmount, foodCost, rentCost, clothesCost)) {
    calculateTotalExpenseAndBalance();
  }
}

function removePreviousError() {
  const errors = Array.from(document.querySelectorAll('.error'));

  if (errors) {
    for (const error of errors) {
      error.remove();
    }
  }
}
function getTheInput() {
  incomeAmount = incomeInput.value;
  foodCost = foodInput.value;
  rentCost = rentInput.value;
  clothesCost = clothesInput.value;
}

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

function showError(parent, msg) {
  const p = document.createElement('p');
  p.classList.add('error');
  p.textContent = msg;

  parent.appendChild(p);

  setTimeout(() => {
    removeError(parent);
  }, 5000);
}

function removeError(parent) {
  // const errorMsg = parent.querySelector('.error');
  // parent.removeChild(errorMsg);
  const errorEl = parent.querySelector('.error');
  if (errorEl) {
    errorEl.remove();
  }
}

function calculateSavings() {
  removePreviousError();
  savingsAmountPlaceholder.textContent = '';
  remainingBalancePlaceholder.textContent = '';

  const savingsPercentage = savingsInput.value;
  if (isValid(savingsPercentage)) {
    const savingAmount = (savingsPercentage * incomeAmount) / 100;
    console.log(savingAmount);

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

calculateBtn.addEventListener('click', handleSubmit);
saveBtn.addEventListener('click', calculateSavings);
clearBtn.addEventListener('click', clearInput);
