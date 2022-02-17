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

calculateBtn.addEventListener('click', handleSubmit);
