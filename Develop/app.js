const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// GIVEN a command-line application that accepts user input

// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input

// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address

// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab

// (Array #1)
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number

// (Array #2)
// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team

// (Array #3)
// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu

// (Array #4)
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu

// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated


// PSEUDO CODE

// Create init() function that uses inquirer to prompt for a manager, final question questin in manger array should ask if they want more employees (yes or no)
    // .then() of manager should use the manager constructon to create a new manager (set that equatl to avariable) then push to your team array
    // check the response to the more team memebers questions --> if yes, call function addTeam if no, call function to write file
    // if adding team what type of team memeber then conditional for each type
    // if intern --> call intern functin that prompts intern questions with the last question being do you want more 



let teamBuilder = [];

const inputManager = [
    {
        name: "managerName",
        message: "Enter your name:",
        type: "input",
        validate: function (answer) {
            if (answer === '') {
                return "Name required.";
            }
            return true;
        },
    },
    {
        name: "managerId",
        message: "Enter your id:",
        type: "input",
        validate: function (answer) {
            if (answer === '') {
                return "ID required.";
            }
            return true;
        },
    },
    {
        name: "managerEmail",
        message: "Enter your email:",
        type: "input",
        validate: function (answer) {
            if (answer === '') {
                return "Email required.";
            }
            return true;
        },
    },
    {
        name: "managerOffice",
        message: "Enter your office number:",
        type: "input",
        validate: function (answer) {
            if (answer === '') {
                return "Office number required.";
            }
            return true;
        },
    },
    {
        name: 'finished',
        message: 'Do you want another team member?',
        type: 'confirm',
    },
];

const inputEngineer = [
    {
        name: "engineerName",
        message: "Enter your name:",
        type: "input",
        validate: function (answer) {
            if (answer === '') {
                return "Name required.";
            }
            return true;
        },
    },
    {
        name: "engineerId",
        message: "Enter your id:",
        type: "input",
        validate: function (answer) {
            if (answer === '') {
                return "ID required.";
            }
            return true;
        },
    },
    {
        name: "engineerEmail",
        message: "Enter your email:",
        type: "input",
        validate: function (answer) {
            if (answer === '') {
                return "Email required.";
            }
            return true;
        },
    },
    {
        name: "engineerOffice",
        message: "Enter your github username:",
        type: "input",
        validate: function (answer) {
            if (answer === '') {
                return "Username required.";
            }
            return true;
        },
    },
    {
        name: 'finished',
        message: 'Do you want another team member?',
        type: 'confirm',
    },
];

const inputIntern = [
    {
        name: "internName",
        message: "Enter your name:",
        type: "input",
        validate: function (answer) {
            if (answer === '') {
                return "Name required.";
            }
            return true;
        },
    },
    {
        name: "internId",
        message: "Enter your id:",
        type: "input",
        validate: function (answer) {
            if (answer === '') {
                return "ID required.";
            }
            return true;
        },
    },
    {
        name: "internEmail",
        message: "Enter your email:",
        type: "input",
        validate: function (answer) {
            if (answer === '') {
                return "Email required.";
            }
            return true;
        },
    },
    {
        name: "internOffice",
        message: "Enter your current school:",
        type: "input",
        validate: function (answer) {
            if (answer === '') {
                return "School required.";
            }
            return true;
        },
    },
    {
        name: 'finished',
        message: 'Do you want another team member?',
        type: 'confirm',
    },
];

const createIntern = () => {
    inquirer
        .prompt(inputIntern) 
        .then(response => {
            let newIntern = new Intern (response.internName, response.internId, response.internEmail, response.internOffice);
            teamBuilder.push(newIntern)
            if (response.finished === true) {
                addEmployee();
            } else {
                writeToHTML();
                console.log(response);
            };
        });
};


const createEngineer = () => {
    inquirer
        .prompt(inputEngineer) 
        .then(response => {
            let newEngineer = new Engineer (response.engineerName, response.engineerId, response.engineerEmail, response.engineerOffice);
            teamBuilder.push(newEngineer)
            if (response.finished === true) {
                addEmployee();
            } else {
                writeToHTML();
                console.log(response);
            };
        });
};

function addEmployee() {
    inquirer
        .prompt([         
        {
            name: 'teamMember',
            message: 'What type of team member do you want?',
            type: 'list',
            choices: ['Engineer', 'Intern', 'None'], 
        },
        ])
        .then(response => {
            if (response.teamMember === 'Engineer') {
                createEngineer();
            } else if (response.teamMember === 'Intern'){
                createIntern();
            } else {
                writeToHTML();
                console.log(response);
            }
        });

};

// reference: Use this
function init() {
    inquirer
        .prompt(inputManager)
        .then(response => {
            // .then({})
            console.log(response);
            let newManager = new Manager (response.managerName, response.managerId, response.managerEmail, response.managerOffice);
            teamBuilder.push(newManager)
            if (response.finished === true) {
                addEmployee();
            } else {
                writeToHTML();
                console.log(response);
            }
        });
};
     
function writeToHTML() {
    fs.writeFile("team.html", render(teamBuilder), err => err ? console.log(err) : console.log('Heres your new file!'))
}
// writeToHTML();
init();