// Define the Person class
class Person {
    constructor(firstName, lastName, birthYear) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = parseInt(birthYear); // Ensure birthYear is treated as a number
    }

    get age() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.birthYear;
    }
}

// Array to hold person objects
let personen = [];

// Function to add a person to the array
function addPerson() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const birthYear = document.getElementById('birthYear').value;

    if (firstName && lastName && birthYear) {
        let person = new Person(firstName, lastName, birthYear);
        personen.push(person);
        updateTable(); // Update the table after adding a new person
    }
}

// Function to update the table
function updateTable() {
    const tbody = document.getElementById('listBody');
    tbody.innerHTML = ''; // Clear existing table body

    // Iterate over the personen array and create table rows
    personen.forEach(person => {
        const row = document.createElement('tr');

        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = person.firstName;
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = person.lastName;
        row.appendChild(lastNameCell);

        const ageCell = document.createElement('td');
        ageCell.textContent = person.age;
        row.appendChild(ageCell);

        tbody.appendChild(row);
    });
}

// Function to sort by last name
//function sortByLastName() {
  //  personen.sort((a, b) => a.lastName.localeCompare(b.lastName));
    //updateTable(); // Update the table after sorting
//}
function sortByLastName() {
    personen.sort(function(a, b) {
        console.log("Comparing:", a.lastName, b.lastName);
        const comparisonResult = a.lastName.localeCompare(b.lastName);
        console.log("Comparison result:", comparisonResult);
        return comparisonResult;
    });
    updateTable();
}


// Function to sort by age
function sortByAge() {
    personen.sort((a, b) => a.age - b.age);
    updateTable(); // Update the table after sorting
}

// Function to remove the last person
function removeLast() {
    if (personen.length > 0) {
        personen.pop();
        updateTable(); // Update the table after removing the last person
    }
}

// Function to remove all persons
function removeAll() {
    personen = [];
    updateTable(); // Update the table after removing all persons
}

// Initial table update to ensure the table is in sync with the array
updateTable();
