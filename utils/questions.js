
module.exports = {
    main: [
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [ 
                "View all employees", 
                "View all employees by Department",
                "View all employees by Manager",
                "Add employee",
                "Remove employee",
                "Update employee role",
                "Update employee manager"
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
    ]
}