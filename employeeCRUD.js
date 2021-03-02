//  switch cases and functions within this file
const inquirer = require("inquirer");
const connection = require("./db/connection");

// async function to load the main prompts needed
const start = () => {
  inquirer
    .prompt({
      type: "list",
      name: "homeList",
      message: "Select an option",
      choices: [
        "Create/Delete Department",
        "Create/Delete Role",
        "Create/Delete Employee",
        "Update Info",
        "View Employees",
      ],
    })
    .then((homeList) => {
      // switch cases
      switch (homeList.homeList) {
        // for each case call a function
        case "Create/Delete Department":
          createDepart();
          break;
        case "Create/Delete Role":
          createRole();
          break;
        case "Create/Delete Employee":
          employCreate();
          break;
        case "Update Info":
          updtRole();
          break;
        case "View Employees":
          viewCrew();
          break;
        default:
          console.log("somethins broke");
      }
    });
};
// functions to
// add department
function createDepart() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter new department:",
      name: "name",
    })
    .then((ans) => {
      connection.query(
        "INSERT INTO department SET ?",
        { name: ans.name },
        function (err, data) {
          if (err) {
            throw err;
          } else {
            console.table(data);
            start();
          }
        }
      );
    });
}
// add role
function createRole() {
  connection.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter job title:",
          name: "role",
          default: "Engineer",
        },
        {
          type: "input",
          message: "Enter salary:",
          name: "salary",
          default: 50000,
        },
        {
          type: "list",
          message: "Select department:",
          choices: res.map((department) => ({
            name: department.name,
            value: department.id,
          })),
          name: "departName",
        },
      ])
      .then((res) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: res.role,
            salary: res.salary,
            department: res.departName,
          },
          function (err, data) {
            if (err) {
              throw err;
            } else {
              console.table(data);
              start();
            }
          }
        );
      });
  });
}
// add/remove employees
function employCreate() {
  inquirer
    .prompt({
      type: "list",
      message: "Create or Delete an Employee?",
      choices: ["Create", "Delete"],
      name: "confirm",
    })
    .then((confirmation) => {
      if (confirmation.confirm === "Create") {
        connection.query("SELECT * FROM role", function (err, res) {
          if (err) throw err;
          connection.query("SELECT * FROM employee", function (err, emp) {
            const employeeList = emp.map((manager) => ({
              name: manager.first_name + " " + manager.last_name,
              value: manager.id,
            }));
            employeeList.push({ name: "none", value: 0 });
            if (err) throw err;
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "Enter employee first name:",
                  name: "first_name",
                  default: "Eloisa",
                },
                {
                  type: "input",
                  message: "Enter employee last name:",
                  name: "last_name",
                  default: "Zambrano",
                },
                {
                  type: "list",
                  message: "Select employee role:",
                  choices: res.map((employee) => ({
                    name: employee.title,
                    value: employee.id,
                  })),
                  name: "role",
                },
                {
                  type: "list",
                  message: "Select manager:",
                  choices: employeeList,
                  name: "manager",
                },
              ])
              .then((designation) => {
                connection.query(
                  "INSERT INTO employee SET ?",
                  {
                    first_name: designation.first_name,
                    last_name: designation.last_name,
                    role_id: designation.role,
                    manager_id: designation.manager,
                  },
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else {
                      console.table(data);
                      start();
                    }
                  }
                );
              });
          });
        });
      } else {
        connection.query("SELECT * FROM employee", function (err, res) {
          if (err) throw err;
          inquirer
            .prompt({
              type: "list",
              message: "Select employee and delete:",
              choices: res.map((adept) => ({
                name: adept.first_name + " " + adept.last_name,
                value: adept.id,
              })),
              name: "delete",
              default: "Eloisa Zambrano",
            })
            .then((input) => {
              connection.query(
                "DELETE FROM employee WHERE ?",
                { id: input.delete },
                function (err, res) {
                  if (err) throw err;
                  console.log("Hello");
                  start();
                }
              );
            });
        });
      }
    });
}
// update department, role, employees
function updtRole() {
  connection.query("SELECT * FROM employee", function (err, emp) {
    if (err) throw err;
    // a connection to make a list of possible roles
    connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            // a list of inquire questions that let you narrow down the list of employees
            type: "list",
            message: "Select role to update:",
            name: "updtEmployeeName",
            choices: emp.map((empler) => ({
              name: empler.first_name + " " + empler.last_name,
              value: empler.id,
            })),
          },
          {
            type: "list",
            message: "Select new role:",
            name: "updtNewRole",
            choices: res.map((roler) => ({
              name: roler.title,
              value: roler.id,
            })),
          },
        ])
        .then((wut) => {
          // Another connection to update the role for the selected employee
          console.log(
            `[{ role_id: ${wut.updtNewRole} }, { id: ${wut.updtEmployeeName} }],`
          );
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [{ role_id: wut.updtNewRole }, { id: wut.updtEmployeeName }],
            function (err, ret) {
              if (err) throw err;
              console.log("Hello");
              start();
            }
          );
        });
    });
  });
}
// view all employees, roles, and departments
function viewCrew() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to view?",
      choices: ["Employees", "Roles", "Departments", "Back"],
      name: "viewChoice",
    })
    .then((fun) => {
      if (fun.viewChoice === "Employees") {
        connection.query(
          "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id AS employee, role.title FROM role LEFT JOIN employee ON employee.role_id = role.id ORDER BY id",
          function (err, res) {
            if (err) throw err;
            console.table(res);
            viewCrew();
          }
        );
      } else if (fun.viewChoice === "Roles") {
        connection.query(
          "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department = department.id;",
          function (err, res) {
            if (err) throw err;
            console.table(res);
            viewCrew();
          }
        );
      } else if (fun.viewChoice === "Departments") {
        connection.query("SELECT * FROM department", function (err, data) {
          if (err) throw err;
          console.table(data);
          viewCrew();
        });
      } else {
        start();
      }
    });
}

start();