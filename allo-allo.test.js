const core = require("@actions/core");
const github = require("@actions/github");
const alloAllo = require("./allo-allo");

/*
 * TODO: Create mockGetOctoKit that returns a mock octokit object
 * This should return a mock octokit object that looks like this:
 * {
 *   rest: {
 *    issues: {
 *      listForRepo: jest.fn() // this should use the mock mockListForRepo
 *    }
 *   }
 * }
 */

/*
 * TODO: create mockListForRepo function that returns a list of issues
 */

function mockListForRepos() {
  jest.spyOn(github, "getOctokit").mockImplementation(() => {
    return {
      rest: {
        issues: {
          listForRepo: jest.fn().mockReturnValue({
            status: 200,
            data: [
              {
                id: 1465569407,
                body: "Currently, this action uses commonjs but one can safely switch to ESM.",
              },
              {
                id: 1460402392,
                pull_request: [null],
                body: "Updates the `README`",
              },
              {
                id: 1460402393,
                pull_request: [null],
                body: "Updates the action yml",
              },
            ],
          }),
        },
      },
    };
  });
}

function mockGetInput(mocks) {
  /*
   * The `??` string is a nullish coalescing operator.
   * It returns its right-hand side operand when its left-hand
   * side operand is null or undefined.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
   */
  const mock = (key) => mocks[key] ?? "";
  return jest.spyOn(core, "getInput").mockImplementation(mock);
}

describe("Allo Allo GitHub Action", () => {
  beforeEach(() => {
    mockGetInput({
      token: "gh_token",
    });
  });

  afterEach(() => {
    github.context.payload = {};
  });

  test("if the action is not one of opened, the action should do nothing", async () => {
    github.context.payload = {
      action: "closed",
    };

    const response = await alloAllo();

    await expect(response).toBe(undefined);
  });

  test("if the user opening the pull request is the repository owner, the action should do nothing", async () => {
    github.context.payload = {
      action: "opened",
      repository: {
        owner: {
          login: "schalkneethling",
        },
      },
      pull_request: {
        user: {
          login: "schalkneethling",
        },
      },
    };

    const response = await alloAllo();

    await expect(response).toBe(undefined);
  });

  test("if the user opening the issue is the repository owner, the action should do nothing", async () => {
    github.context.payload = {
      action: "opened",
      repository: {
        owner: {
          login: "schalkneethling",
        },
      },
      issue: {
        user: {
          login: "schalkneethling",
        },
      },
    };

    const response = await alloAllo();

    await expect(response).toBe(undefined);
  });

  test("if the user opening the pull requst is a bot, the action should do nothing", async () => {
    github.context.payload = {
      action: "opened",
      pull_request: {
        title: "Bump prettier from 2.7.1 to 2.8.0",
        user: {
          login: "dependabot[bot]",
          type: "Bot",
          site_admin: false,
        },
      },
      repository: {
        owner: {
          login: "schalkneethling",
        },
      },
    };

    const response = await alloAllo();

    await expect(response).toBe(undefined);
  });
});
