
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
        case "View all employees by Department":
            // code block
            break;
        case "View all employees by Manager":
            // code block
            break;
        case "Add employee":
            await addEmployee();
            break;
        case "Remove employee":
            await removeEmployee();
            break;
        case "Update employee role":
            // code block
            break;
        case "Update employee manager":
            // code block
            break;
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

async function addEmployee(){
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
            inquirer.prompt(prompt).then((answers)=>{
                db.query("INSERT INTO employee SET ?", answers, (err, results) => {
                    start();
                })
            })
        });
    }); 
}
