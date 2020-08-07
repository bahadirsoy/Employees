//Get elements
const form = document.getElementById("form");
const nameInputElement = document.getElementById("nameInput");
const surnameInputElement = document.getElementById("surnameInput");
const ageInputElement = document.getElementById("ageInput");
const salaryInputElement = document.getElementById("salaryInput");
const tbody = document.getElementById("tbody");
const alert = document.getElementById("alert");
const deleteAllButton = document.getElementById("deleteAllElement");


//Set event listeners
setEventListeners();
loadEmployees();



//Delete all employees
function deleteAllEmployees(e) {
    if (confirm("Are you sure that you want to delete all employees ?")) {

        //Delete children from the UI
        while(tbody.firstElementChild!==null){
            tbody.firstElementChild.remove();
        }

        //Delete from the local storage
        localStorage.removeItem("employees");

        //Show alert
        changeAlert("All employees has been deleted", "info");

    } 

}


//Clear all alert
function clearAlerts() {
    form.childNodes.forEach(function (element) {
        if (element.id === "alert") {
            element.style.display = "none";
        }
    })
}


//Create an alert
function changeAlert(text, type) {
    alert.textContent = text;
    alert.className = `alert alert-${type}`;
    alert.style.display = "block";
}


//Delete employee from storage
function deleteEmployeeFromStorage(name, surname) {
    let employees = getEmployeesFromStorage();

    employees.forEach(function (element, index) {
        if (element.name === name && element.surname === surname) {
            employees.splice(index, 1);

            localStorage.setItem("employees", JSON.stringify(employees));
            changeAlert("Employee has been deleted succesfully", "warning");
        }
    })

}


//Load all employees from storage
function loadEmployees() {
    let employees = getEmployeesFromStorage();

    employees.forEach(function (element) {
        tbody.innerHTML += `<tr>
            <th scope="row">1</th>
            <td>${element.name}</td>
            <td>${element.surname}</td>
            <td>${element.age}</td>
            <td>${element.salary}</td>
            <td>
                <button class="btn btn-danger" id="delete">Delete</button>
            </td>
        </tr>`;
    });

}


//Add employee to the storage
function addEmployeeToStorage(employee) {
    let employees = getEmployeesFromStorage();

    employees.push(employee);

    localStorage.setItem("employees", JSON.stringify(employees));

}


//Get employees from storage as an array
function getEmployeesFromStorage() {
    let employees;

    if (localStorage.getItem("employees") === null) {
        employees = [];
    } else {
        employees = JSON.parse(localStorage.getItem("employees"));
    }

    return employees;

}


//Delete employee
function deleteEmployee(e) {

    if (e.target.id === "delete") {
        e.target.parentElement.parentElement.remove();
        deleteEmployeeFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent, e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    }


    e.preventDefault();

}


//Clear inputs
function clearInputs() {
    nameInputElement.value = "";
    surnameInputElement.value = "";
    ageInputElement.value = "";
    salaryInputElement.value = "";
}


//Add employee
function addEmployee(e) {

    const name = nameInputElement.value;
    const surname = surnameInputElement.value;
    const age = ageInputElement.value;
    const salary = salaryInputElement.value;
    const emp = createEmployee(name, surname, age, salary);


    if (name === "" || surname === "" || age === "" || salary === "") {
        changeAlert("There is empty field", "danger");
    } else {
        addEmployeeToUI(emp);
        addEmployeeToStorage(emp);
        clearAlerts();
        clearInputs();
        changeAlert("Employee has been added succesfully", "success");
    }

    
    e.preventDefault();

}


//Add employee to the UI
function addEmployeeToUI(employee) {
    tbody.innerHTML += `<tr>
        <th scope="row">1</th>
        <td>${employee.name}</td>
        <td>${employee.surname}</td>
        <td>${employee.age}</td>
        <td>${employee.salary}</td>
        <td>
            <button class="btn btn-danger" id="delete">Delete</button>
        </td>
    </tr>`;



}


//Create new employee
function createEmployee(name, surname, age, salary) {
    const employee = new Employee(name, surname, age, salary);
    return employee;
}


//Create event listeners function
function setEventListeners() {
    form.addEventListener("submit", addEmployee);
    tbody.addEventListener("click", deleteEmployee);
    deleteAllButton.addEventListener("click", deleteAllEmployees);
}


//Employee
class Employee {
    constructor(name, surname, age, salary) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.salary = salary;
    }
}
