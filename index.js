const core = require("@actions/core");
const alloAllo = require("./allo-allo");

// most @actions toolkit packages have async methods
async function run() {
  try {
    alloAllo();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
