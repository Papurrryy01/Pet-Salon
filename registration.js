let pets = [
    {name: "Miller", age: 1, gender: "Male", service: "Bath", breed: "Bulldog"},
    {name: "Luna", age: 3, gender: "Female", service: "Haircut", breed: "Poodle"},
    {name: "Rocky", age: 2, gender: "Male", service: "Nail Trim", breed: "Boxer"},
    {name: "Bella", age: 4, gender: "Female", service: "Teeth Cleaning", breed: "Husky"}
];
console.log("Pets array Loaded:", pets);

function displayPetCount() {
    let total = pets.length;
    document.getElementById("petCount").textContent = "Total Registered Pets: " + total;
}
displayPetCount();

function displayPetNames() {
    let listItems = "";
    for (let i=0; i < pets.length; i++) {
        listItems += `<li class="list-group-item"><strong>${pets[i].name}</strong> - ${pets[i].service}</li>`; 
    }
    document.getElementById("petList").innerHTML = listItems;
}
displayPetCount();
displayPetNames();

function calculateAverageAge(){
    let totalAge = 0
    for (let i = 0; i < pets.length; i++){
        totalAge += pets[i].age;
    }
    const avg = totalAge / pets.length;
    document.getElementById("avgAge").textContent = "Average Age: " + avg.toFixed(1);
}
displayPetCount();
displayPetNames();
calculateAverageAge();