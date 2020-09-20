// Select all the dom elements
const submit = document.getElementById('submit');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const modalContent = document.querySelector('.modal-content');
const closeAppInfoBox = document.querySelector('.close');

// Close app info message
closeAppInfoBox.addEventListener('click', function () {
  document.querySelector('.info').style.display = 'none';
});

// OnSubmit show the calorie count
submit.addEventListener('click', function (e) {
  e.preventDefault();
  dailyCalorieCount();
});

// Close modal when clicked on close button
closeButton.addEventListener('click', function () {
  modal.classList.toggle('show-modal');
});

// Close modal when clicked anywhere at window
window.addEventListener('click', windowOnClick);

function windowOnClick(event) {
  if (event.target === modal) {
    modal.classList.toggle('show-modal');
  }
}

// Calculating women Calorie BRM
function dailyCalorieCount() {
  // Select all the input fields to calculate calories
  const maleChecked = document.getElementById('male').checked;
  const femaleChecked = document.getElementById('female').checked;
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;

  // Check first if all the fields has correct data
  checkEmptyFields(age, weight, height);

  // Count calorie if selected MALE
  if (maleChecked && age !== '' && weight !== '' && height !== '') {
    // Basal Metabolic Rate Formulas Man
    const maleBMR = 66.473 + 13.7516 * weight + 5.0033 * height - 6.755 * age;
    getActivit(maleBMR);
    const modalMale = modal.classList.toggle('show-modal');
    clearInputs();
    return modalMale;
  }
  // Count calorie if selected FEMALE
  if (femaleChecked && age !== '' && weight !== '' && height !== '') {
    // Basal Metabolic Rate Formulas Women
    const femaleBMR =
      655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * age;
    getActivit(femaleBMR);
    const modalFemale = modal.classList.toggle('show-modal');
    clearInputs();
    return modalFemale;
  }
}

// Activity Status with Daily Calories Results
function getActivit(bmr) {
  const activity = document.getElementById('activity');
  const strUser = activity.options[activity.selectedIndex].value;
  let results = document.querySelector('.calories-results');

  if (strUser === 'no') {
    return (results.innerText = `You need ${Math.round(
      bmr * 1.2
    )} daily calories`);
  }
  if (strUser === 'light') {
    return (results.innerText = `You need ${Math.round(
      bmr * 1.375
    )} daily calories`);
  }
  if (strUser === 'moderate') {
    return (results.innerText = `You need ${Math.round(
      bmr * 1.55
    )} daily calories`);
  }
  if (strUser === 'heavy') {
    return (results.innerText = `You need ${Math.round(
      bmr * 1.725
    )} daily calories`);
  }
  if (strUser === 'extreme') {
    return (results.innerText = `You need ${Math.round(
      bmr * 1.9
    )} daily calories`);
  }
}

// Check forms input feilds
function checkEmptyFields(age, weight, height) {
  const allFields = document.querySelectorAll('.field');

  // Check if the age is 16 to 79 years old
  if (age <= 15 || age >= 80) {
    allFields[0].classList.add('error');
    allFields[1].classList.add('error');
    document.querySelector('#errorBox').style.display = 'block';
  } else {
    allFields[0].classList.remove('error');
    allFields[1].classList.remove('error');
    document.querySelector('#errorBox').style.display = 'none';
  }

  if (weight === '' || weight <= 0) {
    // Check if the weight fields are not empty or in negitive value
    allFields[2].classList.add('error');
    document.querySelector('#errorBox').style.display = 'block';
  } else {
    allFields[2].classList.remove('error');
    document.querySelector('#errorBox').style.display = 'none';
  }

  if (height === '' || height <= 0) {
    // Check if the weight fields are not empty or in negitive value
    allFields[3].classList.add('error');
    allFields[4].classList.add('error');
    document.querySelector('#errorBox').style.display = 'block';
  } else {
    allFields[3].classList.remove('error');
    allFields[4].classList.remove('error');
    document.querySelector('#errorBox').style.display = 'none';
  }
}

// Clear input fields
function clearInputs() {
  const age = (document.getElementById('age').value = '');
  const weight = (document.getElementById('weight').value = '');
  const height = (document.getElementById('height').value = '');
  document.getElementById('male').checked = '';
  document.getElementById('female').checked = '';
  document.getElementById('activity').value = 'non';
}
