const mysql = require("mysql");
const inquirer = require("inquirer");
const { start } = require("repl");
const connection = mysql.createConnection({

    //Host
    host: "localhost",

    //Port
    port: 3306,

    //Username
    user: "root",

    //Password
    password: "password",
    database: "employeesDB"

});


//Connect
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});


// What would the user like to do?  
//Add departments, roles, employees
// View departments, roles, employees
// Update employee roles

function start() {
    inquirer
      .prompt({
        name: "",
        type: "list",
        message: "Would you like to [POST] an auction or [BID] on an auction?",
        choices: ["POST", "BID", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.postOrBid === "POST") {
          postAuction();
        }
        else if(answer.postOrBid === "BID") {
          bidAuction();
        } else{
          connection.end();
        }
      });
  }


//Add employee 

function addEmployee() {
    console.log("Inserting a new employee...\n");
    inquirer
    .prompt([
                "INSERT INTO employee SET ?",
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
                    console.log(res.affectedRows + " product inserted!\n");
                    // Call update employee AFTER the INSERT completes
                    updateEmployee();
                }
            ]);



    //Log the query being run 

    console.log(query.sql);


//Function to view departmnet, roles, employees

//Function update Employee

//Call updateEmployee AFTER the INSERT completes








//Bonus points if you're able to:

//Update employee managers

//View employees by manager

//Delete departments, roles, and employees

//View the total utilized budget of a department -- ie the combined salaries of all employees in that department