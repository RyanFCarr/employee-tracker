
const inquirer = require("inquirer");
const questions = require("./utils/questions");
const fs = require("fs");
const mysql = require("mysql");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

// db Obj
const db = mysql.createConnection({
    multipleStatements: true,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "simplepw",
});

db.connect(function (err) {
    if (err) throw err;
    console.log('Connected! Port:3306');
});

init_db().then(() => {
    start();
});

async function start() {
    const answers = await inquirer.prompt(questions.main)

    switch (answers.choice) {
        case "View all employees":
            await selectAll();
            break;
        case "View all departments":
            viewDepartments()
            break;
        case "View all roles":
            viewRoles()
            break;
        case "Add employee":
            await addEmployee();
            break;
        case "Add department":
            addDepartment();
            break;
        case "Add role":
            addRole();
            break;
        case "Delete employee":
            await removeEmployee();
            break;
        case "Update employee role":
            await updateRole();
            break;
        case "Update employee manager":
            await updateManager();
            break;
        default:
           db.end();

    }
}


async function init_db() {
    console.log('Initializing..');
    let sql_seed = await readFileAsync('seed.sql');
    db.query(sql_seed.toString(), (error) => {
        if (error) console.error(error.message)
        db.changeUser({ database: 'employees_db' })
    });
    console.log('Database created.')
}

async function selectAll() {
    let sql = `select e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, concat(m.first_name," ", m.last_name) as manager
                from employee as e

                left join employee m 
                    on e.manager_id = m.id

                left join role r
                    on e.role_id = r.id

                left join department d
                on r.department_id = d.id`

    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results)
        start();
    });
}

async function removeEmployee() {
    let sql = `SELECT id, first_name, last_name FROM employee`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        const employees = results.map(employee => {
            return {
                value: employee.id,
                name: `${employee.first_name} ${employee.last_name}`,
                short: `${employee.first_name} ${employee.last_name}`
            };
        })

        const prompt = [...questions.remove];
        prompt[0].choices = employees;
        inquirer.prompt(prompt).then(answers => {
            let sql = `DELETE FROM employee where id=${answers.choice}`;
            db.query(sql, (err, results) => {
                console.log('Employee Deleted!')
                start();
            });
        })
    })
}

async function addEmployee() {
    // roles
    db.query(`SELECT id, title from role`, (err, results) => {
        if (err) throw err;
        const roles = results.map(role => {
            return {
                value: role.id,
                name: role.title,
                short: role.title
            };
        })
        const prompt = [...questions.add];
        prompt[2].choices = roles;

        // mangagers
        let managerSelect = `SELECT id, concat(first_name, " ", last_name) AS fullName from employee WHERE manager_id is NULL`;
        db.query(managerSelect, (err, results) => {
            if (err) throw err;
            const managers = results.map(manager => {
                return {
                    value: manager.id,
                    name: manager.fullName,
                    short: manager.fullName
                };
            })
            prompt[3].choices = managers;
            inquirer.prompt(prompt).then((answers) => {
                db.query("INSERT INTO employee SET ?", answers, (err, results) => {
                    start();
                })
            })
        });
    });
}

async function updateRole() {
    let sql = `SELECT id, first_name, last_name FROM employee`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        const employees = results.map(employee => {
            return {
                value: employee.id,
                name: `${employee.first_name} ${employee.last_name}`,
                short: `${employee.first_name} ${employee.last_name}`
            };
        })

        db.query(`SELECT id, title from role`, (err, results) => {
            if (err) throw err;
            const roles = results.map(role => {
                return {
                    value: role.id,
                    name: role.title,
                    short: role.title
                };
            });
            const prompt = [...questions.updateEmpRole];
            prompt[0].choices = employees;
            prompt[1].choices = roles;
            inquirer.prompt(prompt).then(answers => {
                let setRole = `UPDATE employee SET role_id = ${answers.employee_role} WHERE id=${answers.employee}`;
                db.query(setRole, (err, results) => {
                    console.log('Employee Role Updated!')
                    start();
                })

            });
        });
    });
}

async function updateManager() {
    let sql = `SELECT id, first_name, last_name FROM employee`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        const employees = results.map(employee => {
            return {
                value: employee.id,
                name: `${employee.first_name} ${employee.last_name}`,
                short: `${employee.first_name} ${employee.last_name}`
            };
        });

        let updateManager = `SELECT id, concat(first_name, " ", last_name) AS fullName from employee WHERE manager_id is NULL`;

        db.query(updateManager, (err, results) => {
            if (err) throw err;
            const managers = results.map(manager => {
                return {
                    value: manager.id,
                    name: manager.fullName,
                    short: manager.fullName
                };
            });
            const prompt = [...questions.updateEmpManager];
            prompt[0].choices = employees;
            prompt[1].choices = managers;
            inquirer.prompt(prompt).then(answers => {
                let setManager = `UPDATE employee SET manager_id = ${answers.manager} WHERE id=${answers.emp}`;
                db.query(setManager, (err, results) => {
                    console.log('Updated employee\'s Manager!')
                    start();
                })
            });
        });
    });
}

function viewDepartments() {
    let sql = `SELECT id, name as Department FROM department`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results)
        start();
    });
}

function viewRoles() {
    let sql = `SELECT r.id, r.title as role, r.salary, d.name as department 
                FROM role as r 
                inner join department as d
                ON r.department_id = d.id`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results)
        start();
    });
}

function addDepartment() {
    let sql = `INSERT INTO department SET ?`;
    inquirer.prompt(questions.addDepartment)
        .then(answers => db.query(sql, answers, () => start()));
}

function addRole() {
    db.query(`SELECT id, name from department`, (err, results) => {
        if (err) throw err;
        const departments = results.map(department => {
            return {
                value: department.id,
                name: department.name,
                short: department.name
            };
        })
        const prompt = [...questions.addRole];
        prompt[2].choices = departments;
        let sql = `INSERT INTO role SET ?`;
        inquirer.prompt(prompt)
            .then(answers => db.query(sql, answers, () => start()));
    });
}
