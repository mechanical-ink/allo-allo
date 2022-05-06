const github = require("@actions/github");
// const core = require("@actions/core");

async function run() {
  // const token = core.getInput("GH_TOKEN");
  // const octokit = new github.getOctokit(token);
  // const issueComment = core.getInput("issueGreeting");
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  return payload;
}

run();
