
module.exports = {
    main: [
        {
            "type": "list",
            "name": "name",
            "message": "What would you like to do?",
            choices: [ 
                "View all employees", 
                "View all employees by Department",
                "View all employees by Manager",
                "Add employee",
                "Remove employee",
                "Update employee role",
                "Update employee manager"
            ]
        },
        {
            "type": "input",
            "name": "email",
            "message": "What is the Employee's email?",
            "validate": email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        },
        {
            "type": "input",
            "name": "id",
            "message": "What is the Employee's id?"
        }  
    ],
}