// function to loop over the steps that were created
const generateInstallationSteps = steps => {
  // create an empty string to add steps to
  let stepStr = '';
  //console.log(steps);
  //loop over the step array
  for (let i=0; i < steps.installationSteps.length; i++) {
    stepStr = stepStr + `Step ${i+1}: ${steps.installationSteps[i].installationSteps}<br />`
  }
  return stepStr;
}

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
const generateMarkdown = data => {
  return `
  # ${data.name}

  ## Description:
  ${data.description}

  ## Installation
  ${generateInstallationSteps(data)}

`;
}

module.exports = templateData => {
  // destructure page data 
  //const { name, description } = templateData;
  return `
    ${generateMarkdown(templateData)}
  `;
};
