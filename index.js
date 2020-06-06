    
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
    }
    start();

    async function init_db(){
        console.log('Initializing..');
        let sql_seed = await readFileAsync('seed.sql');
        db.query(sql_seed.toString());
        console.log('Database created.')
    }
    
    

    
   
    // async function start_empManager(){
    //     const answers = await inquirer.prompt(questions.main)
    // }
    // start_empManager().then(()=>{
    //     console.log('end');
    // });
