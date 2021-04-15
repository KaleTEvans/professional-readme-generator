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
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter your project description!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmContribution',
            message: 'Would you like to add contribution guidelines to your readme?',
            default: true
        },
        {
            type: 'input',
            name: 'contributions',
            message: 'Please provide guidelines on how to contribute to your project',
            when: ({ confirmContribution }) => confirmContribution
        },
        {
            type: 'input',
            name: 'githubName',
            message: 'Please provide your GitHub username',
            validate: githubNameInput => {
                if (githubNameInput) {
                    return true;
                } else {
                    console.log('Please enter the name to your GitHub account!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'githubLink',
            message: 'Please provide a link to your github',
            validate: githubLinkInput => {
                if (githubLinkInput) {
                    return true;
                } else {
                    console.log('Please enter the link to your GitHub account!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'emailAddress',
            message: 'Please provide your email address',
            validate: emailAddressInput => {
                if (emailAddressInput) {
                    return true;
                } else {
                    console.log('Please enter your email address!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddContact',
            message: 'Would you like to provide additional information about contacting you?',
            default: false
        },
        {
            type: 'input',
            name: 'contactInfo',
            message: 'Provide additional contact steps',
            when: ({ confirmAddContact }) => confirmAddContact
        },
        {
            type: 'confirm',
            name: 'confrimAddTests',
            message: 'Would you like to add a test section to the readme? If yes, please paste your code into the markup once it is generated.',
            default: false
        },
        {
            type: 'list',
            name: 'licenses',
            message: 'Please select which license you would like to use for your readme',
            choices: ['Apache', 'MIT', 'GNU', 'No License']
        }
    ])
};

const installationStepInput = userData => {
    if (!userData.installationSteps) {
        userData.installationSteps = [];
    }
    console.log('*****INSTALLATION STEPS*****');
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
};

const usageInput = userData => {
    console.log('*****USAGE*****');
    if (!userData.usage) {
        userData.usage = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for use, or a caption for your screenshot (Required)',
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log('Please enter a brief usage description');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddImg',
            message: 'Would you like to add a screenshot for the usage section?',
            default: false
        },
        {
            type: 'input',
            name: 'usageImg',
            message: `Please create an "assets/images" folder in your repository 
                and upload your image to it. Then provide the filepath.`,
            when: ({ confirmAddImg }) => confirmAddImg
        },
        {
            type: 'confirm',
            name: 'confirmNewUsage',
            message: 'Would you like to add more usage examples?',
            default: false
        }
    ]).then(usageData => {
        userData.usage.push(usageData);
        if (usageData.confirmNewUsage) {
            return usageInput(userData);
        } else return userData;
    })
};


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
    .then(usageInput)
    .then(userData => {
        return generateMarkdown(userData);
    })
    .then(markdownData => {
        return writeFile(markdownData);
    })
    .catch(err => {
        console.log(err);
    })
