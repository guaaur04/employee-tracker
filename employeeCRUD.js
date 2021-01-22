const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({

    //Host
    host: "localhost",

    //Port
    port: 3306,

    //Username
    user: "root",

    //Password
    password: "password",
    database: "department_db"

});


//Connect
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});



// What would the user like to do?  

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Would you like to [ADD] [VIEW] or [UPDATE] your database?",
            choices: ["ADD", "VIEW", "UPDATE", "EXIT"]
        })

        .then(function (answer) {
            // Based on user response, call the appropriate function...
            switch (answer.action) {
                case "ADD":
                    addEmployee();
                    break;

                case "VIEW":
                    viewEmployee();
                    break;


                case "UPDATE":
                    updateEmployee();
                    break;
            }
        });
}


//Add employee 

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "Enter the employee's first name..."
            },

            {
                name: "last_name",
                type: "input",
                message: "Enter the employee's last name..."
            },


            function (err, res) {
                if (err) throw err;
                console.log("Inserting a new employee...\n");
                console.log(res.affectedRows + " employee added!\n");
                // Call update employee AFTER the INSERT completes
                updateEmployee();
            }

        ]);

    //Log the query being run 

    console.log(query.sql);
};

//Function to view departmnet, roles, employees
function viewEmployee() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Would you like to search by [DEPARTMENT] [ROLE] or [EMPLOYEE]?",
            choices: ["DEPARTMENT", "ROLE", "EMPLOYEE", "EXIT"
            ]
        })

        .then(function (answer) {

//Function update employee



//Call updateEmployee AFTER the INSERT completes








//Bonus points if you're able to:

//Update employee managers

//View employees by manager

//Delete departments, roles, and employees

//View the total utilized budget of a department -- ie the combined salaries of all employees in that department