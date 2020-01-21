const managerInit = require("./manager");
const teamInit = require("./team");
const Manager = require('./lib/Manager');
const util = require('util');

const fs = require("fs");
const fsReadFileAsync = util.promisify(fs.readFile);
const fsAppendFileAsync = util.promisify(fs.appendFile);

const teamMembers = [];
let question = "not done";

async function init() {
    let managerData = await managerInit();
    //console.log(managerData);
    //create manager obj
    const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.office);
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
    try {
        const managerTemplate = await fsReadFileAsync("./templates/manager.html", "utf8");
        //update template with manager data

        const returnManagerData = () => {

            console.log(managerTemplate);
            let setRole = managerTemplate.replace("ManagerName", `${manager.name}`)
            let setId = setRole.replace("ID", `Id: ${manager.id}`);
            let mailtoEmail = setId.replace("mailto:Email", `mailto:${manager.email}`);
            let showEmail = mailtoEmail.replace("ShowEmail", `${manager.email}`);
            let officeNum = showEmail.replace("OfficeNumber", `OfficeNumber: ${manager.getOfficeNumber()}`)
            return officeNum;
        }
        let managerHtml = returnManagerData();
        //add closing html text to html string
        managerHtml += "</body></html>";
        //append html string to main.html
        console.log(managerHtml)
        const mainTemplate = await fsAppendFileAsync('./templates/main.html', managerHtml);

    } catch (error) {
        console.log("message: " + error);
    }

}

init();
