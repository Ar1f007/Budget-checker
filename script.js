const form = document.querySelector('form');
const incomeInput = document.querySelector('#income');
const foodInput = document.querySelector('#food');
const rentInput = document.querySelector('#rent');
const clothesInput = document.querySelector('#clothes');
const calculateBtn = document.querySelector('#calculate');
const totalExpenseEl = document.querySelector('#total-expense');
const balanceEl = document.querySelector('#balance');

let incomeAmount = null,
  foodCost = null,
  rentCost = null,
  clothesCost = null;

function handleSubmit(e) {
  e.preventDefault();

  getTheInput();

  isValid(incomeAmount, foodCost, rentCost, clothesCost);

  calculateTotalExpenseAndBalance();
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
    const balance = Number(incomeAmount) - totalExpenses;

    if (balance) {
      balanceEl.querySelector('span').textContent = balance;
    }
  }
}

function getTheInput() {
  incomeAmount = incomeInput.value;
  foodCost = foodInput.value;
  rentCost = rentInput.value;
  clothesCost = clothesInput.value;
}

function isValid(income, food, rent, clothes) {
  if (isNaN(income) || isNaN(food) || isNaN(rent) || isNaN(clothes)) {
    showError(form, 'Please enter a number input value');
    return;
  }

  if (income < 0 || food < 0 || rent < 0 || clothes < 0) {
    showError(form, 'Please enter a number input greater than 0(zero)');
    return;
  }
}

function showError(parent, msg) {
  const p = document.createElement('p');
  p.classList.add('error');
  p.textContent = msg;

  parent.appendChild(p);

  setTimeout(() => {
    removeError(form);
  }, 5000);
}

function removeError(parent) {
  const errorMsg = parent.querySelector('.error');
  parent.removeChild(errorMsg);
}

calculateBtn.addEventListener('click', handleSubmit);
