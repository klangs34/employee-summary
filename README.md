## employee-summary
summarize employee roster

# user story
As a manager I want to generate a webpage that displays my team's basic info
so that I have quick access to emails and GitHub profiles

# Business Context
This app allows you to build a team roster via command line, and then have the output saved to a nicely styled html page.  The final output will be saved in your "Templates" directory as "main.html".  Use this file wherever you see fit...i.e. it can be implemented in your company's existing website as a static page.

# Technology
This app takes advantage of Node's built-in fs library that reads and writes data to and from a file.  The app uses a series of html templates based on employee role to pull the entire roster template together (main.html). 

## Installation
1. Fork the respository
1. Use git clone from the CLI to clone the remote repository
1. Update/Modify the project as you see fit
   1. use git to save versions
   1. push your own commit to your repository

# To use
1. To start the application run "node app" from the terminal
1. As user/manager, you will be prompted for your name and email
1. From here, you are prompted to build your team, starting with the team member's name and email.  Additional information is requested per user role - this will differ across roles.
1. To end the program, type "no" or "n" when prompted to enter another member.  This will end the program and then generate an output html file titled "main.html".  You this file at your descretion.





