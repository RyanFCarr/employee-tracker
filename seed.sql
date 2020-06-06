DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);



INSERT INTO department (name) VALUES ("sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 105000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 110000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 115000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 120000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Team Lead", 125000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 130000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jane", "Doe", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Smith", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jane", "Smith", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Jones", 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jane", "Jones", 6, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ronald", "Reagan", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Nancy", "Reagan", 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ryan", "Carr", 5, 3);