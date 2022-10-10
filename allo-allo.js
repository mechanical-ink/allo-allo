const github = require("@actions/github");
const core = require("@actions/core");

async function alloAllo() {
  const token = core.getInput("token");
  const octokit = new github.getOctokit(token);
  const issueComment = core.getInput("issueGreeting");

  const payload = github.context.payload;
  const repoID = payload.repository.id;
  let response = null;

  console.log("payload", payload);

  const creator = payload.pull_request.user.login || payload.issue.user.login;

  if (repoID) {
    const { status, data: issues } = await octokit.rest.issues.listForRepo({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      creator: creator,
    });

    if (status !== 200) {
      throw new Error(`Received unexpected API status code ${status}`);
    }

    const issueList = issues.filter((issue) => !issue.pull_request);
    const pullRequestList = issues.filter((issue) => issue.pull_request);

    console.log("issueList", issueList);
    console.log("pullRequestList", pullRequestList);
  }

  try {
    response = await octokit.rest.issues.createComment({
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
