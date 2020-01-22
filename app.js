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
            let officeNum = showEmail.replace("OfficeNumber", `OfficeNumber: ${manager.getOfficeNumber()}`)
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
        const readTemplateHtml = async function(obj) {
            
            if(obj.role === "Employee") {
                //set template URL
                templateURL = "./templates/employee.html";
            }
            if(obj.role === "Engineer") {
                //set template URL
                templateURL = "./templates/engineer.html";
            }
            if(obj.role === "Intern") {
                //set template URL
                templateURL = "./templates/intern.html";
            
            }
            //read each appropriate template
            const assignMemberHtml = await fsReadFileAsync(templateURL, "utf8");

            //create team member html file with replaced data
            let setRole = assignMemberHtml.replace("Name", `${obj.name}`);
            let setId = setRole.replace("ID", `Id: ${manager.id}`);
            let mailtoEmail = setId.replace("mailto:Email", `mailto:${manager.email}`);
            let showEmail = mailtoEmail.replace("ShowEmail", `Email: ${manager.email}`);
            if(obj.role === "Employee") {
                memberRole = showEmail.replace("Title", `Title: ${obj.title}`);
            }
            if(obj.role === "Engineer"){
                memberRole = showEmail.replace("GitHub", `Github: ${obj.github}`);
            }
            if(obj.role === "Intern") {
                memberRole = showEmail.replace("School", `School: ${obj.school}`);
            }

            return memberRole;
        }

        //append each team member div to the main html file
        teamMembers.forEach(async val => {
            let teamData = await readTemplateHtml(val);
            let i = 0;
            //if last element is past, add closing elements
            if(i === teamMembers.length - 1) {
                await fsAppendFileAsync('./templates/main.html', teamData + "</body></html>");
            } else {
                await fsAppendFileAsync('./templates/main.html', teamData);
                i++;
            }
        })
            
            //console.log(templateHtml)
                
            // fs.readFile(templateURL, "utf8", (err, data) => {
            //     //create team member html file
            //     let setRole = data.replace("Name", `${val.name}`);
            //     let setId = setRole.replace("ID", `Id: ${manager.id}`);
            //     let mailtoEmail = setId.replace("mailto:Email", `mailto:${manager.email}`);
            //     let showEmail = mailtoEmail.replace("ShowEmail", `${manager.email}`);
            //     if(val.role === "Employee") {
            //         memberRole = showEmail.replace("Title", `Title: ${val.title}`);
            //     }
            //     if(val.role === "Engineer"){
            //         memberRole = showEmail.replace("GitHub", `Github: ${val.github}`);
            //     }
            //     if(val.role === "Intern") {
            //         memberRole = showEmail.replace("School", `School: ${val.school}`);
            //     }
            //     return memberRole;
            // });

       // });

            //console.log(memberRole);
            
            // //add closing html text to html string
            // managerHtml += templateHtml + "</body></html>";
            // //append html string to main.html
            // console.log(managerHtml)

            //join manger html to team html
           //teamMembers.unshift(manager);
   
            
            //const mainTemplate = await fsAppendFileAsync('./templates/main.html', managerHtml);
    } catch (error) {
        console.log("message: " + error);
    }

}

init();
