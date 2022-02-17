const form = document.querySelector('form');
const incomeInput = document.querySelector('#income');
const foodInput = document.querySelector('#food');
const rentInput = document.querySelector('#rent');
const clothesInput = document.querySelector('#clothes');
const totalExpenseEl = document.querySelector('#total-expense');
const balanceEl = document.querySelector('#balance');

const savingsInput = document.querySelector('#save');
const savingAmountEl = document.querySelector('#saving-amount');
const remainingBalanceEl = document.querySelector('#remaining-balance');
const budgetInfoEl = document.querySelector('#budget-info');
const savingsAmountPlaceholder = savingAmountEl.querySelector('span');
const remainingBalancePlaceholder = remainingBalanceEl.querySelector('span');

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
}

function calculateTotalExpenseAndBalance() {
  const totalExpenses =
    Number(foodCost) + Number(rentCost) + Number(clothesCost);
  if (totalExpenses) {
    totalExpenseEl.querySelector('span').textContent = totalExpenses;
  }

  if (totalExpenses > incomeAmount) {
    showError(
      form,
      'Your total expenses is greater than your total income! 💣'
    );
  } else {
    balance = Number(incomeAmount) - totalExpenses;

    if (balance) {
      balanceEl.querySelector('span').textContent = balance;
    }
  }
}

function isValid() {
  const inputs = arguments;
  for (const input of inputs) {
    if (isNaN(input) || input < 0) {
      if (isNaN(input)) {
        showError(form, 'Please enter a number input value');
      } else {
        showError(form, 'Please enter a number input greater than 0(zero)');
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
  const errorMsg = parent.querySelector('.error');
  parent.removeChild(errorMsg);
}

function calculateSavings() {
  removePreviousError();
  savingsAmountPlaceholder.textContent = '';
  remainingBalancePlaceholder.textContent = '';

  const savingsPercentage = savingsInput.value;
  if (isValid(savingsPercentage)) {
    const savingAmount = (savingsPercentage * incomeAmount) / 100;

    if (savingAmount > balance) {
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
