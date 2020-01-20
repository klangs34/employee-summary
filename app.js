const managerInit = require("./manager");
const teamInit = require("./team");
const Manager = require('./lib/Manager');

var fs = require("fs");

const teamMembers = [];
let question = "not done";

async function init() {
    let managerData = await managerInit();
    //console.log(managerData);
    //create manager obj
    const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
    // this.manager.title = "Team Lead";

    // while (question !== "done") {
    //     let teamData = await teamInit();
    //     console.log(teamData);
    //     let { add } = teamData;
    //     if (!add) {
    //         question = "done";
    //         //return;
    //     }
    //     teamMembers.push(teamData);
    //     console.log(teamMembers);
    // }

    fs.readFile("./templates/manager.html", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        console.log(data);
        let setId = data.replace("ID", `Id: ${manager.id}`);
        let setEmail = setId.replace("Email", `Email: ${manager.email}`);
        let mailtoEmail = setEmail.replace("mailto:Email", `mailto:${manager.email}`);
        let showEmail = mailtoEmail.replace("ShowEmail", `${manager.email}`);
        let officeNum = showEmail.replace("OfficeNumber", `OfficeNumber: ${manager.getOfficeNumber()}`)
        console.log(officeNum)

    });

}

init();
