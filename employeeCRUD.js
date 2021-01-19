const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    //Port

    port: 3306,

    //Username
    user: "root",

    //Password
    password: "",
    database: "employeesDB"

});


//Connection.connect function
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    createProduct();
});

//Function create/add Employee 

function createEmployee() {
    console.log("Inserting a new employee...\n");
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            flavor: "Rocky Road",
            price: 3.0,
            quantity: 50
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            updateEmployee();
        }
    );


    //Log the query being run 

    console.log(query.sql);
}

//Function to view departmnet, roles, employees

//Function update Employee

//Call updateEmployee AFTER the INSERT completes








//Bonus points if you're able to:

//Update employee managers

//View employees by manager

//Delete departments, roles, and employees

//View the total utilized budget of a department -- ie the combined salaries of all employees in that department