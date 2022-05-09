const core = require("@actions/core");
const alloAllo = require("./allo-allo");

// most @actions toolkit packages have async methods
async function run() {
  try {
    const newIssueComment = await alloAllo();
    console.log("newIssueComment", newIssueComment);
    core.setOutput("newIssueComment", newIssueComment);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
