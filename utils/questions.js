const inquirer = require("inquirer");
module.exports = {
    main: [
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [ 
                "Add employee",
                "Add role",
                "Add department",
                "View all employees",
                "View all roles",
                "View all departments",
                "Update employee role",
                new inquirer.Separator(), 
                "View all employees by Department",
                "View all employees by Manager",
                "Update employee manager",
                "Delete employee",
                "Delete role",
                "Delete department"   
            ]
        }
    ],
    remove: [
        {
            type: "list",
            name: "choice",
            message: "Which employee would you like to remove?",
            choices: []
        }
    ],
    add: [
        {
            type: "input",
            name: "first_name",
            message: "What is the employees\'s first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employees\'s second name?",
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employees\'s role?",
        },
        {
            type: "list",
            name: "manager_id",
            message: "Which employee do you want to set as manager for the selected employee?"
        }
    ],
    updateEmpManager: [
        {
            type: "list",
            name: "emp",
            message: "Which employee\'s manager would you like to update?",
            choices: []
        },
        {
            type: "list",
            name: "manager",
            message: "Which employee do you want to set as manager for the selected employee?",
            choices: []
        }
    ],
    updateEmpRole: [
        {
            type: "list",
            name: "employee",
            message: "Which employee\'s role would you like to update?",
            choices: [] 
        },
        {
            type: "list",
            name: "employee_role",
            message: "Whats is the employee\'s role?",
            choices: [] 
        }
    ],
    addDepartment: [
        {
            type: "input",
            name: "name",
            message: "What department would you like to add?"
        }
    ],
    addRole: [
        {
            type: "input",
            name: "title",
            message: "What role would you like to add?"
        },
        {
            type: "input",
            name: "salary",
            message: "What will be the salary of this role?"
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department will have this role?",
            choices: []
        }
    ]
}