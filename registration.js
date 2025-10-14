// Pet constructor
function Pet(name, age, gender, breed, service, type) {
  this.name = name;
  this.age = Number(age);
  this.gender = gender;
  this.breed = breed;
  this.service = service;
  this.type = type; // Dog / Cat
}

//pets array
const pets = [
  new Pet("Miller", 1, "Male", "Bulldog", "Bath", "Dog"),
  new Pet("Luna", 3, "Female", "Poodle", "Haircut", "Dog"),
  new Pet("Rocky", 2, "Male", "Boxer", "Nail Trim", "Dog"),
  new Pet("Bella", 4, "Female", "Husky", "Teeth Cleaning", "Dog"),
];


function displayPetCount() {
  const el = document.getElementById("petCount");
  if (el) el.textContent = "Total Registered Pets: " + pets.length;
}

function calculateAverageAge() {
  const el = document.getElementById("avgAge");
  if (!el) return;
  if (pets.length === 0) {
    el.textContent = "Average Age: —";
    return;
  }
  const total = pets.reduce((sum, p) => sum + p.age, 0);
  el.textContent = "Average Age: " + (total / pets.length).toFixed(1);
}

// Table
function displayRow(pet, index) {
  return `
    <tr data-index="${index}">
      <td>${pet.name}</td>
      <td>${pet.age}</td>
      <td>${pet.gender}</td>
      <td>${pet.breed}</td>
      <td>${pet.service}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deletePet(${index})">
          Delete
        </button>
      </td>
    </tr>`;
}

// Whole table
function renderTable() {
  const tbody = document.getElementById("petsTbody");
  if (!tbody) return;
  let rows = "";
  for (let i = 0; i < pets.length; i++) {
    rows += displayRow(pets[i], i);
  }
  tbody.innerHTML = rows;
}

//Actions
function deletePet(index) {
  pets.splice(index, 1);
  displayPetCount();
  calculateAverageAge();
  renderTable();
}

//Init
displayPetCount();
calculateAverageAge();
renderTable();