const fs = require('fs');
const generateMarkdown = require('../Develop/utils/generateMarkdown');
const sampleAnswers = require('./sample');


// TODO: Create a function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./README.md', fileContent, err => {
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

writeFile(generateMarkdown(sampleAnswers))
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });