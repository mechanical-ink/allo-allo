# Allo Allo

![A young woman with dark hair wearing a French style police uniform](allo-allo-380.png)

Allo Allo is a simple welcome bot for GitHub. It will welcome new users to your repository and help them get started.

## Usage

When a contributor opens their first issue or pull request, Allo Allo will leave a comment to welcome them to your repository. You can choose to only add a comment on new issues or new pull requests by specifying only one of the options.

### Default configuration

```yaml
name: "AlloAllo"

on:
  issues:
    types:
      - opened
  pull_request_target:
    branches:
      - main
    types:
      - opened

permissions:
  contents: read
  issues: write
  pull-requests: write

jobs:
  allo-allo:
    uses: mechanical-ink/allo-allo@main
    with:
      with:
        issueWelcome: |
          It looks like this is your first issue. Welcome! 👋
          One of the project maintainers will be with you as soon as possible. We
          appreciate your patience. To safeguard the health of the project, please
          take a moment to read our [code of conduct](../blob/main/CODE_OF_CONDUCT.md).
        prWelcome: |
          It looks like this is your first pull request. 🎉
          Thank you for your contribution! One of the project maintainers will triage
          and assign the pull request for review. We appreciate your patience. To
          safeguard the health of the project, please take a moment to read our
          [code of conduct](../blob/main/CODE_OF_CONDUCT.md).
        token: ${{ secrets.GITHUB_TOKEN }}
```

### Comment on new issues only

```yaml
name: "AlloAllo"

on:
  issues:
    types:
      - opened

permissions:
  contents: read
  issues: write

jobs:
  allo-allo:
    uses: mechanical-ink/allo-allo@main
    with:
      with:
        issueWelcome: |
          It looks like this is your first issue. Welcome! 👋
          One of the project maintainers will be with you as soon as possible.
          We appreciate your patience. To safeguard the health of the project, please
          take a moment to read our [code of conduct](../blob/main/CODE_OF_CONDUCT.md).
        token: ${{ secrets.GITHUB_TOKEN }}
```

### Comment on new pull requests only

```yaml
name: "AlloAllo"

on:
  pull_request_target:
    branches:
      - main
    types:
      - opened

permissions:
  contents: read
  pull-requests: write

jobs:
  allo-allo:
    uses: mechanical-ink/allo-allo@v1
    with:
      with:
        prWelcome: |
          It looks like this is your first pull request. 🎉 Thank you for your contribution!
          One of the project maintainers will triage and assign the pull request for review.
          We appreciate your patience. To safeguard the health of the project, please take a
          moment to read our [code of conduct](../blob/main/CODE_OF_CONDUCT.md).
        token: ${{ secrets.GITHUB_TOKEN }}
```

## Communication

If you have any questions, please reach out to us on [GitHub](https://github.com/mechanical-ink/community) or via [Discord](https://discord.gg/Ty3RytTxCR)

## License

This project is licensed under the [LICENSE](LICENSE.md).

This pull request will not be merged
