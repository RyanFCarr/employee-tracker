
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
            message: " Which employee would you like to remove?",
            choices: []
        }
    ]
}