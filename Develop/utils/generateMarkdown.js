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
};

const generateUsage = usageData => {
  // create a empty array to add usage info to
  let usageStr = '';
  // loop over the array
  for (let i=0; i < usageData.usage.length; i++) {
    usageStr = usageStr + usageData.usage[i].usage;
    // conditional for images added
    if (usageData.usage[i].confirmAddImg === true) {
      usageStr = usageStr + `<br />![](${usageData.usage[i].usageImg})<br />`
    }
  }
  return usageStr;
}

// if extra sections are selected
const generateExtraContent = contData => {
  if (contData.confirmContribution && !contData.confirmAddTests) {
    return `## Contribution Guidelines
  ${contData.contributions}`;
  } 
  else if (contData.confirmAddTests && !contData.confirmContribution) {
    return `## Tests
  Provide your sample tests here.`;
  } 
  else if (contData.confirmContribution && contData.confirmAddTests) {
    return `## Contribution Guidelines
  ${contData.contributions}
    
  ## Tests
  Provide your sample tests here.
    `;
  } else return '';
}

// for table of contents
const generateTOC = data => {
  if (data.confirmContribution && !data.confirmAddTests) {
    return `* [Contribution](#contribution)`;
  }
  else if (data.confirmAddTests && !data.confirmContribution) {
    return `* [Tests](#tests)`;
  }
  else if (data.confirmContribution && data.confirmAddTests) {
    return `* [Contribution](#contribution)
  * [Tests](#tests)`
  } else return '';
}

// if contact info was added
const generateContact = data => {
  if (data.contactInfo) {
    return `Details: ${data.contactInfo}`;
  } else return '';
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

  ## Table of Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  ${generateTOC(data)}
  * [License](#license)

  ## Description
  ${data.description}

  ## Installation
  ${generateInstallationSteps(data)}

  ## Usage 
  ${generateUsage(data)}

  ${generateExtraContent(data)}

  ## Contact
  * Github: [${data.githubName}](${data.githubLink})
  * Email: ${data.emailAddress}
  ${generateContact(data)}

  ## License
  
`;
}

module.exports = templateData => {
  console.log(templateData);
  // destructure page data 
  //const { name, description } = templateData;
  return `
    ${generateMarkdown(templateData)}
  `;
};
