const inquirer = require("inquirer");

async function managerInit() {

    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Team Manager's name?"
        },
        {
            type: "input",
            name: "email",
            message: "Team Manger's email address?"
        },
        {
            type: "input",
            name: "id",
            message: "Team Manager's ID number?"
        },
        {
            type: "input",
            name: "office",
            message: "Managers office number?",
        }
    ])
};

module.exports = managerInit;
