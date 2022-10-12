const github = require("@actions/github");
const core = require("@actions/core");

async function alloAllo() {
  const token = core.getInput("token");
  const octokit = new github.getOctokit(token);
  const issueComment = core.getInput("issueWelcome");
  const prComment = core.getInput("prWelcome");

  const payload = github.context.payload;

  // if the action was not one of 'opened', take no action
  if (payload.action !== "opened") {
    return;
  }

  // The username of the user that created the issue or pull request
  const creator = payload.pull_request?.user.login || payload.issue?.user.login;
  // The id of the current issue or pull request
  const currentActionId = payload.number || payload.issue?.number;
  const isPullRequest = payload.pull_request ? true : false;

  // Get all issues for the current user.
  // Issues include both issues and pull requests
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

  // if the user has more than one issue and pull request, take no action
  if (issueList.length > 1 && pullRequestList.length > 1) {
    return;
  }

  let response = null;

  console.log("currentActionId", currentActionId, typeof currentActionId);
  console.log("pullRequestList", pullRequestList);
  console.log("issueList", issueList);

  // if this is a pull request, and the pull request list contains one entry
  // check whether the currentActionId is the same as the pull request id
  // if it is, createReview with the pull request message if defined
  if (
    isPullRequest &&
    pullRequestList.length === 1 &&
    pullRequestList[0].number === currentActionId &&
    prComment
  ) {
    try {
      response = await octokit.rest.pulls.createComment({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        pull_number: currentActionId,
        body: prComment,
      });
    } catch (error) {
      console.error(error);
      core.setFailed(
        `Error while creating pull request comment: ${error.message}`
      );
    }
  }

  // if this is not a pull request, and the issue list contains one entry
  // check whether the currentActionId is the same as the issue id
  // if it is, createComment with the issue message if defined
  if (
    !isPullRequest &&
    issueList.length === 1 &&
    issueList[0].number === currentActionId &&
    issueComment
  ) {
    try {
      response = await octokit.rest.issues.createComment({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: currentActionId,
        body: issueComment,
      });
    } catch (error) {
      console.log(error);
      core.setFailed(`Error while creating comment: ${error.message}`);
    }
  }

  return response;
}

module.exports = alloAllo;
