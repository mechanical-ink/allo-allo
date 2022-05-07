const github = require("@actions/github");
const core = require("@actions/core");

async function alloAllo() {
  const token = core.getInput("GH_TOKEN");
  const octokit = new github.getOctokit(token);
  const issueComment = core.getInput("issueGreeting");

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = github.context.payload;

  try {
    const response = await octokit.rest.issues.createComment({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.issue.number,
      body: issueComment,
    });
  } catch (error) {
    console.log(`Error while creating comment: ${error}`);
    core.setFailed(error.message);
  }

  return response;
}

module.exports = alloAllo;
