const tipBoxs = document.querySelectorAll('.tip-box');
const billInput = document.querySelector('.bill');
const peopleInput = document.querySelector('.people');
const customInput = document.querySelector('.custom');
const amount = document.querySelector('.amount');
const total = document.querySelector('.total');
const btnReset = document.querySelector('.btn-reset');
const peopleError = document.querySelector('.people-error');
const billError = document.querySelector('.bill-error');

let tipPercentage = 0;

tipBoxs.forEach((box) => {
  box.addEventListener('click', () => {
    activeBox(box);
    customInput.value = '';
    tipPercentage = +box.innerText.slice(0, -1);

    if (InputsIsValid()) {
      displayBillAndTotal();
    }
  });
});

billInput.addEventListener('input', (e) => {
  const value = +e.target.value;

  checkError(billError, value);

  if (InputsIsValid()) {
    displayBillAndTotal();
  }
});

customInput.addEventListener('input', (e) => {
  tipPercentage = +e.target.value;

  if (InputsIsValid()) {
    displayBillAndTotal();
  }
});

peopleInput.addEventListener('input', (e) => {
  const value = +e.target.value;

  checkError(peopleError, value);

  if (InputsIsValid()) {
    displayBillAndTotal();
  }
});

btnReset.addEventListener('click', () => {
  billInput.value = peopleInput.value = customInput.value = '';
  amount.innerText = total.innerText = '$0.00';
  const activeBox = document.querySelector('.tip-box.active');
  activeBox.classList.remove("active");
});

function checkError(element, value) {
  if (value <= 0) {
    displayError(element, "Can't be zero or minus");
  } else {
    displayError(element, '');
  }

  if (typeof value !== 'number' || isNaN(value)) {
    displayError(element, 'must be a number');
  }
}

function displayError(element, message) {
  element.innerText = message;
}

function InputsIsValid() {
  const activeBox = document.querySelector('.tip-box.active');

  const billBox = activeBox?.innerText.slice(0, -1) || customInput.value;
  const billInputIsValid = billInput.value && billError.innerText === '';
  const peopleInputIsValid = peopleInput.value && peopleError.innerText === '';

  const isValid = billInputIsValid && peopleInputIsValid && billBox;

  if (isValid) return true;

  return false;
}

function displayBillAndTotal() {
  amount.innerText =
    '$' +
    calcBillPerPerson(+billInput.value, +peopleInput.value, tipPercentage);

  total.innerText =
    '$' +
    calcTotalPerPerson(+billInput.value, +peopleInput.value, tipPercentage);
}

function calcBillPerPerson(billInput, peopleInput, tipPercentage) {
  const bill = (billInput * tipPercentage) / 100 / peopleInput;
  return bill.toFixed(2);
}

function calcTotalPerPerson(billInput, peopleInput, tipPercentage) {
  const totalBill = billInput + (billInput * tipPercentage) / 100;
  const TotalPerPerson = (totalBill / peopleInput).toFixed(2);
  return TotalPerPerson;
}

function activeBox(clickedBox) {
  tipBoxs.forEach((box) => {
    box.classList.remove('active');
  });
  clickedBox.classList.add('active');
}
