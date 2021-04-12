// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./Develop/utils/generateMarkdown');

// TODO: Create an array of questions for user input
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your project description!');
                    return false;
                }
            }
        },
    ])
}
const installationStepInput = userData => {
    if (!userData.installationSteps) {
        userData.installationSteps = [];
    }
    console.log('INSTALLATION STEPS');
    return inquirer.prompt([
        {
            type: 'input',
            name: 'installationSteps',
            message: 'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.',
            validate: installationSteps => {
                if (installationSteps) {
                    return true;
                } else {
                    console.log('Please enter at least one installation step');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddStep',
            message: 'Would you like to add another step?',
            default: false
        }
    ]).then(steps => {
        userData.installationSteps.push(steps);
        if (steps.confirmAddStep) {
            return installationStepInput(userData);
        } else {
            return userData;
        }
    })
}

// TODO: Create a function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File Created!'
            });
        });
    });
};

// Function to generate the file
promptUser()
    .then(installationStepInput)
    // .then(userData => {
    //     console.log(userData);
    // })
    .then(userData => {
        return generateMarkdown(userData);
    })
    .then(markdownData => {
        return writeFile(markdownData);
    })
    .catch(err => {
        console.log(err);
    })
