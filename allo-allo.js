const github = require("@actions/github");
const core = require("@actions/core");

async function alloAllo() {
  const token = core.getInput("GH_TOKEN");
  const octokit = new github.getOctokit(token);
  const issueComment = core.getInput("issueGreeting");

  const payload = github.context.payload;
  const repoID = payload.repository.id;
  let response = null;

  // author:USERNAME
  if (repoID) {
    // const userInfoRepoCtx = await octokit.rest.users.getContextForUser({
    //   username: payload.issue.user.login,
    //   subject_type: "repository",
    //   subject_id: repoID,
    // });

    // const userInfoIssueCtx = await octokit.rest.users.getContextForUser({
    //   username: payload.issue.user.login,
    //   subject_type: "issue",
    //   subject_id: repoID,
    // });

    // const userInfoPRCtx = await octokit.rest.users.getContextForUser({
    //   username: payload.issue.user.login,
    //   subject_type: "pull_request",
    //   subject_id: repoID,
    // });

    const response = await octokit.rest.issues.listForRepo({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      creator: payload.issue.user.login,
    });

    console.log("payload.repository.name", payload.repository.name);
    console.log(
      "payload.repository.owner.login",
      payload.repository.owner.login
    );
    console.log("payload.issue.user.login", payload.issue.user.login);
    console.log("response", JSON.stringify(response, null, 2));
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
