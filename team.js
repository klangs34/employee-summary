const inquirer = require("inquirer");

async function teamInit() {

    return inquirer.prompt([
        {
            type: "confirm",
            name: "add",
            message: "Do you want to add another team members?",
            default: true
        },
        {
            type: "input",
            name: "name",
            message: "Team member's name?",
            when: answer => {
                return answer.add === true;
            }
        },
        {
            type: "list",
            name: "role",
            message: "Team member's Role?",
            choices: [
                "Employee",
                "Engineer",
                "Intern"
            ],
            when: answer => {
                return answer.add === true;
            }
        },
        {
            type: "input",
            name: "school",
            message: "Attending school/university?",
            when: answer => {
                return (answer.role === "Intern") && (answer.add === true);
            }
        },
        {
            type: "input",
            name: "title",
            message: "Employee title?",
            when: answer => {
                return (answer.role === "Employee") && (answer.add === true);
            }
        },
        {
            type: "input",
            name: "github",
            message: "Engineer's github username?",
            when: answer => {
                return (answer.role === "Engineer") && (answer.add === true);
            }
        }
    ])
};

module.exports = teamInit;