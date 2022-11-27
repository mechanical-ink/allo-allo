const core = require("@actions/core");
const github = require("@actions/github");
const alloAllo = require("./allo-allo");

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
});
