const managerInit = require("./manager");
const teamInit = require("./team");
const Manager = require('./lib/Manager');
const util = require('util');

const fs = require("fs");
const fsReadFileAsync = util.promisify(fs.readFile);
const fsAppendFileAsync = util.promisify(fs.appendFile);
const fsWriteFileAsync = util.promisify(fs.writeFile);

const teamMembers = [];
let question = "not done";

async function init() {

    let managerData = await managerInit();

    //create manager obj
    const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.office);
    // this.manager.title = "Team Lead";

    while (question !== "done") {
        let teamData = await teamInit();
        let { add } = teamData;
        if (!add) {
            question = "done";
        }

        //push team items in array
        teamMembers.push(teamData);
    }

    //remove false/last object entry
    teamMembers.pop();

    try {

        const managerTemplate = await fsReadFileAsync("./templates/manager.html", "utf8");
        //update html template with manager data

        const returnManagerData = () => {

            let setRole = managerTemplate.replace("Name", `${manager.name}`)
            let setId = setRole.replace("ID", `Id: ${manager.id}`);
            let mailtoEmail = setId.replace("mailto:Email", `mailto:${manager.email}`);
            let showEmail = mailtoEmail.replace("ShowEmail", `Email: ${manager.email}`);
            let officeNum = showEmail.replace("OfficeNumber", `Office Number: ${manager.getOfficeNumber()}`)
            return officeNum;
        }

        let managerHtml = returnManagerData();

        //append manager data to main html
        await fsAppendFileAsync("./templates/main.html", managerHtml);

        //move on to team member data
        //set global variables
        let templateHtml = "";
        let memberRole;

        //create an async function to read each data array
        const readTemplateHtml = async function (obj) {

            if (obj.role === "Employee") {
                //set template URL
                templateURL = "./templates/employee.html";
            }
            if (obj.role === "Engineer") {
                //set template URL
                templateURL = "./templates/engineer.html";
            }
            if (obj.role === "Intern") {
                //set template URL
                templateURL = "./templates/intern.html";

            }
            //read each appropriate template
            const assignMemberHtml = await fsReadFileAsync(templateURL, "utf8");

            //create team member html file with replaced data
            let setRole = assignMemberHtml.replace("Name", `${obj.name}`);
            let setId = setRole.replace("ID", `Id: ${obj.id}`);
            let mailtoEmail = setId.replace("mailto:Email", `mailto:${obj.email}`);
            let showEmail = mailtoEmail.replace("ShowEmail", `Email: ${obj.email}`);
            if (obj.role === "Employee") {
                memberRole = showEmail.replace("Title", `Title: ${obj.title}`);
            }
            if (obj.role === "Engineer") {
                memberRole = showEmail.replace("github.com/GitHub", `http://github.com/${obj.github}`);
                memberRole = memberRole.replace("GitHub", `Github: ${obj.github}`);
            }
            if (obj.role === "Intern") {
                memberRole = showEmail.replace("School", `School: ${obj.school}`);
            }

            return memberRole;
        }

        //append each team member div to the main html file
        for (let i = 0; i < teamMembers.length; i++) {
            let teamData = await readTemplateHtml(teamMembers[i]);
            await fsAppendFileAsync('./templates/main.html', teamData);
        }

    } catch (error) {
        console.log("message: " + error);
    }

}

async function startCLI() {
    await init();
    //read main html file
    const data = await fsReadFileAsync('./templates/main.html', "utf8");
    //write main file contents in output file
    await fsWriteFileAsync('./output/team.html', data + "</body></html>");
}

startCLI();
