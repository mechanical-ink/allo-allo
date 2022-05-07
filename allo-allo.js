const github = require("@actions/github");
const core = require("@actions/core");

async function alloAllo() {
  const token = core.getInput("GH_TOKEN");
  const octokit = new github.getOctokit(token);
  const issueComment = core.getInput("issueGreeting");

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log("payload", payload);

  const response = octokit.rest.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.html_url,
    issue_number: payload.issue.number,
    body: issueComment,
  });

  return response;
}

module.exports = alloAllo;
