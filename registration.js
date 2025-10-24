// Pet constructor
function Pet(name, age, gender, breed, service, type) {
  this.name = name;
  this.age = Number(age);
  this.gender = gender;
  this.breed = breed;
  this.service = service;
  this.type = type; // Dog / Cat
}

//list of registered pets
const pets = [];

// Registration handler
function registerPet(event) {
  event.preventDefault();// to prevent the page from reloading()
  //(IDs defined in registration.html)
  const name = document.getElementById("petName").value.trim();
  const age = document.getElementById("petAge").value;
  const breed = document.getElementById("petBreed").value.trim();
  const gender = document.getElementById("petGender").value;
  const service = document.getElementById("petService").value;
  const type = document.getElementById("petType").value;

  //validation (chequea si los avlores estan vacios o son no-validos)
  if (!name || age === "" || !breed || !gender || !service || !type) {
    alert("Please fill out all fields before registering the pet.");
    return;
  }

  const newPet = new Pet(name, age, gender, breed, service, type);
  pets.push(newPet);

  // Update UI
  renderTable();
  displayPetCount();
  calculateAverageAge();

  // Clear the form
  event.target.reset();
}

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

// Expose registerPet
window.registerPet = registerPet;


$("#changeModeBtn").click(function(){
    $("body").toggleClass("dark-mode");

    const isDark = $("body").hasClass("dark-mode");
    
    if (isDark) {
        $("h1").text("Dark Mode");
    } else{
        $("h1").text("Light Mode");
    }
});