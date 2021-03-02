CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL (10,2),
    department INT REFERENCES department(id),
    PRIMARY KEY(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT REFERENCES role(id),
    manager_id INT REFERENCES role(id),
    PRIMARY KEY(id)
);

INSERT INTO employee ( first_name, last_name, role_id)
VALUES ( "Magdalena", "Pedroso", 1 );
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ( "Carmencita", "Verano", 2 );
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ( "Wilfredo", "Galeano", 3 );
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ( "Eloisa", "Zambrano", 4 );
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ( "Horacito", "Fleitas", 5 );


INSERT INTO role ( title, salary )
VALUES ( "Manager", "70000.00" );
INSERT INTO role ( title, salary )
VALUES ( "Intern", "70000.00" );
INSERT INTO role ( title, salary )
VALUES ( "Engineer", "70000.00" );


INSERT INTO department ( name )
VALUES ( "Production" );
INSERT INTO department ( name )
VALUES ( "Research" );
INSERT INTO department ( name )
VALUES ( "Accounting" );
INSERT INTO department ( name )
VALUES ( "Purchasing" );
