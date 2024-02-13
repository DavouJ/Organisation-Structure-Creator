const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Create a empty array to store the team members after they are created
let teamMembers = [];

// Create a empty array to store the member IDs after they are created
let ids = []

// Function to create the manager. Should be the initial function called when creating the team.
function createManager() {
    // Ask for a name, id, email and office number for the manager
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the team manager\'s name?',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                } else {
                    console.log('Please enter the team manager\'s name');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'id',
            message: 'Enter the team manager\'s ID.',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                } else {
                    console.log('Please enter the team manager\'s name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the team manager\'s email address?',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                } else {
                    console.log('Please enter the team manager\'s name');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'officeNumber',
            message: 'What is the team manager\'s office number?',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                } else {
                    console.log('Please enter the team manager\'s name');
                    return false;
                }
            }
        }
    ])
        .then((managerAnswers) => {
            // Then store the answers into a new Manager object
            const manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
            //push the manager into the team members array
            teamMembers.push(manager)
            next()
        })
    
}

// Function to create an engineer.
const createEngineer = () => {

    // Asks for a name, id, email, and github
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the team engineers\'s name?',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                } else {
                    console.log('Please enter the team engineers\'s name');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'id',
            message: 'Enter the team engineers\'s ID.',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                } else {
                    console.log('Please enter the team engineers\'s name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the team engineers\'s email address?',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                } else {
                    console.log('Please enter the team engineers\'s name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'gitHub',
            message: 'What is the team engineers\'s GitHub username?',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                } else {
                    console.log('Please enter the team engineers\'s name');
                    return false;
                }
            }
        }
    ])
        .then((engineerAnswers) => {
            // Then store the answers into a new engineer object
            const engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.gitHub);
            //push the manager into the team members array
            teamMembers.push(engineer)
            next()
        })
    
}

// Function to create an intern
// Asks for a name, id, email, and school
const createIntern = () => {

    // Asks for a name, id, email, and github
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the team interns\'s name?',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                } else {
                    console.log('Please enter the team interns\'s name');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'id',
            message: 'Enter the team interns\'s ID.',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                } else {
                    console.log('Please enter the team interns\'s name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the team interns\'s email address?',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                } else {
                    console.log('Please enter the team interns\'s name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the team interns\'s school?',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                } else {
                    console.log('Please enter the team interns\'s name');
                    return false;
                }
            }
        }
    ])
        .then((internAnswers) => {
            // Then store the answers into a new engineer object
            const intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school);
            //push the manager into the team members array
            teamMembers.push(intern)
            next()
        })
    
}

function next() {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do next?',
            name: 'next',
            choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
        }
    ]).then((nextAnswer) => {
        switch(nextAnswer.next) {
            case "Add an engineer":
                createEngineer();
                break;
            case "Add an intern":
                createIntern();
                break;
            case "Finish building the team":
                createTeam(teamMembers);
                
        }
    })
}
function createTeam(teamMembers){
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    console.log(manager.getName())
}

// Then create a conditional to check which member the user picked and run the appropriate function based off of that input ex:`if(userChoice === 'Engineer'){createEngineer()}`
// Have a else condition so that if they choose to not make any more members, the file gets written.(Can create a function for this and then call the function)

// Function to hold all of the other functions.
// Call the function to initialize the app.
function driver() {
    createManager()
}

driver()