    
    const inquirer = require("inquirer");
    const questions = require("./utils/questions");
    const fs = require("fs");
    const mysql = require("mysql");
    const util = require("util");

    const readFileAsync = util.promisify(fs.readFile);

    // db Obj
    const db = mysql.createConnection({
        multipleStatements:true,
        host: "localhost",
        port: 3306,
        user: "root",
        password: "simplepw",
    });
  
    db.connect(function(err) {
        if (err) throw err;
        console.log('Connected! Port:3306'); 
    });

    async function start(){
        await init_db();
        selectAll();
        db.close();
    }
    start();

    async function init_db(){
        console.log('Initializing..');
        let sql_seed = await readFileAsync('seed.sql');
        db.query(sql_seed.toString(),(error)=>{
            if(error) console.error(error.message)
            db.changeUser({database:'employees_db'})
        });
        console.log('Database created.')
    }

    async function selectAll(){
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
        }); 
    }

    async function removeEmployee(){
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
        }); 
    }
   
     
    // async function start_empManager(){
    //     const answers = await inquirer.prompt(questions.main)
    // }
    // start_empManager().then(()=>{
    //     console.log('end');
    // });
