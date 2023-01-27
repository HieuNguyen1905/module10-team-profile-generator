//TODO: create the team
const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

// TODO:Prompt manager
inquirer.prompt([
    {
        type: 'input',
        name:'name',
        message: 'Enter the team manager name:',
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
        type: 'input',
        name:'number',
        message: 'Enter the office number:',
    },
    {
        type: 'list',
        name: 'question',
        //TODO: add list of options
        choices: ['Add an Engineer', 'Add an Intern', 'Finish building my team',]
    }
]).then((answers) =>{
    switch(answers.question){
        case 'Add an Engineer':
            console.log('add engineer!');
            addEngineer();
            break;

        case 'Add an Intern':
            console.log('add intern!');
            addIntern();
            break;

        default:
            console.log('Your HTML has been created');
            break;
    }
    const manager = new Manager(answers.name, answers.id, answers.email, answers.number);
    return manager;
})

//TODO: Prompt engineer
function addEngineer(){
    inquirer.prompt([
        {
            type: 'input',
            name:'name',
            message: 'Enter the engineer name:',
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
            type: 'input',
            name:'github',
            message: 'Enter GitHub username:',
        },
        {
            type: 'list',
            name: 'question',
            choices: ['Add an Intern', 'Finish building my team'],
        }
    ]).then((data) => {
        if(data.question == 'Add an Intern'){
            addIntern();
        }else{
            console.log('Your HTML has been created')
        }
        const engineer = new Engineer(data.name, data.id, data.email, data.github);
        return engineer;
        
    })
}
//TODO prompt intern
function addIntern(){
    inquirer.prompt([
        {
            type: 'input',
            name:'name',
            message: 'Enter the intern name:',
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
            type: 'input',
            name:'school',
            message: 'Enter intern school:',
        },
        {
            type: 'list',
            name: 'question',
            choices: ['Finish building my team'],
        }
    ]).then((data) => {
        if(data.choices == 'Finish building my team'){
            console.log('Your HTML has been created')
        }
        const intern = new Intern(data.name, data.id, data.email, data.school);
        return intern;
    })
}
// TODO: What is this team parameter that got passed in?
const generateTeam = team => {
    // create the manager html
    const generateManager = manager => {
        return `
        <div class="card employee-card">
        <div class="card-header">
            <h2 class="card-title">${manager.getName()}</h2>
            <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${manager.getId()}</li>
                <li class="list-group-item">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                <li class="list-group-item">Office number: ${manager.getOfficeNumber()}</li>
            </ul>
        </div>
    </div>
        `;
    };

    // create the html for engineers
    const generateEngineer = engineer => {
        return `
        <div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${engineer.getName()}</h2>
        <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${engineer.getRole()}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${engineer.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
            <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.getGithub()}</a></li>
        </ul>
    </div>
</div>
        `;
    };

    // create the html for interns
    const generateIntern = intern => {
        return `
        <div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${intern.getName()}</h2>
        <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${intern.getRole()}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${intern.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
            <li class="list-group-item">School: ${intern.getSchool()}</li>
        </ul>
    </div>
</div>
        `;
    };

    const html = [];

    html.push(team
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => generateManager(manager))
    );
    html.push(team
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => generateEngineer(engineer))
        .join("")
    );
    html.push(team
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => generateIntern(intern))
        .join("")
    );

    return html.join("");

}

// export function to generate entire page
module.exports = team => {

    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">
                ${generateTeam(team)}
            </div>
        </div>
    </div>
</body>
</html>
    `;
};
