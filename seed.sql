-- Drop, create, use employees_db --
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

-- Create "department" table --
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT,
    -- string cannot contain null --
    name VARCHAR(30) NOT NULL,
    -- Sets id to PK --
    PRIMARY KEY (id)
);

-- Create "role" table --
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT,
    -- string cannot contain null --
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    -- Sets id to PK --
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create "employee" table --
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT NOT NULL,
    -- string cannot contain null --
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    -- Sets id to PK --
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
