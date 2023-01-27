//TODO: create the team
const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generateTeam = require("./lib/generateTeam")
const Manager = require("./lib/Manager");
const path = require("path");
const team = [];

promptEmployee();
// TODO:Prompt manager
function promptEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name:'name',
            message: 'Enter employee name:',
        },
        {
            type: 'input',
            name:'id',
            message: 'Enter the employee ID:',
        },
        {
            type: 'input',
            name:'email',
            message: 'Enter the employee email:',
        },
      
        {
            type: 'list',
            name: 'question',
            message: 'What is the roll of this employee?',
            //TODO: add list of options
            choices: ['Manager', 'Engineer', 'Intern']
        }
    ]).then((answers) =>{
        if(answers.question == 'Manager'){
            inquirer.prompt([
                {
                    type: 'input',
                    name:'number',
                    message: 'Enter the office number:',
                },
            ]).then((data) =>{
            const newManager = new Manager(answers.name, answers.id, answers.email, data.number);
            team.push(newManager);
            addOrQuit();
        })
        }
        if(answers.question == 'Engineer'){
            inquirer.prompt([
                {
                    type: 'input',
                    name:'github',
                    message: 'Enter Github username:',
                },
            ]).then((data) =>{
            const newEngineer = new Engineer(answers.name, answers.id, answers.email, data.github);
            team.push(newEngineer);
            addOrQuit();
        })
        }
        if(answers.question == 'Intern'){
            inquirer.prompt([
                {
                    type: 'input',
                    name:'school',
                    message: 'Enter Intern school:',
                },
            ]).then((data) =>{
            const newIntern = new Intern(answers.name, answers.id, answers.email, data.school);
            team.push(newIntern);
            addOrQuit();
        })
        }
    })
}    

function addOrQuit(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'question',
            message: 'Do you want to add another employee?',
            //TODO: add list of options
            choices: ['Yes', 'Quit'],
        }
    ]).then((data) =>{
        if(data.question == 'Yes'){
            promptEmployee();
        }else{
            fs.writeFile('index.html',generateTeam(team),err => err? console.log(err):'');
        }
    })
}


