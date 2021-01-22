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
    database: "employee_db"

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
            name: "options",
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
        }

    ])

        .then(function (answer) {
            console.log("Inserting a new employee...\n");
            const query = connection.query
            ("INSERT INTO employe SET ?" , {
                first_name: answer.first_name,
                last_name:answer.last_name,
            })
        },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee added!\n");

                // Call update employee AFTER the INSERT completes
                updateEmployee();
            }

        );


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
            switch (answer.action) {
            case "DEPARTMENT":
            departmentSearch();
            break;
        
              case "ROLE":
            roleSearch();
            break;
        
              case "EMPLOYEE":
            employeeSearch();
            break;

        }
        
        });
}


//Function update employee role
function updateEmployee() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What would you like to update?"
            },
        ])

        .then(function (answer) {
            // When finished prompting, insert a new item into the DB with user update
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.item,
                    last_name:answer.item,
                    role_id: answer.item,
                    manager_id: answer.item
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your update was created successfully!");

                    // Re-prompt and re-route to the startFunction
                    start();
                }
            );
        });
}
}
//Bonus points if you're able to:

//Update employee managers

//View employees by manager

//Delete departments, roles, and employees

//View the total utilized budget of a department -- ie the combined salaries of all employees in that department