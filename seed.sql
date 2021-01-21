CREATE DATABASE department_db;

USE department_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)

);

-- CREATE DATABASE role_DB;

-- USE role_DB;

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary decimal, 
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id) 

);

-- CREATE DATABASE employee_DB;

-- USE employee_DB;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT default 0,
  manager_id INT default 0,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id)

);

