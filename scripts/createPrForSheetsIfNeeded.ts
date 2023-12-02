// Run using npx vite-node ./scripts/createPrForSheetsIfNeeded.ts
// or TARGET_REPOSITORY="..." npx vite-node ./scripts/createPrForSheetsIfNeeded.ts
import { exit } from 'process';
import { $, chalk } from 'zx';

const repository = process.env['TARGET_REPOSITORY']
  ? process.env['TARGET_REPOSITORY']
  : 'bastislack/highline-freestyle';
const mainRemoteBranch = process.env['GITHUB_HEAD_REF']
  ? process.env['GITHUB_HEAD_REF']
  : 'origin/rewrite';

console.log(chalk.blue('Looking for changes since last commit:'));

function parseDiffOutput(output: string) {
  function getOperations(operation: string) {
    switch (operation) {
      case 'M':
        return 'Modified';
      case 'R':
        return 'Renamed';
      case 'D':
        return 'Deleted';
      case 'A':
        return 'Added';
      default:
        throw new Error('Unexpected Git Diff Operation: ' + operation);
    }
  }

  return output
    .split('\n')
    .filter((e) => e.trim().length > 0)
    .map((e) => {
      const asCharArray = e.split('');
      const operation = asCharArray[0];
      const file = asCharArray.filter((_, i) => i > 1).join('');
      return [operation, file] as const;
    })
    .map(([operation, file]) => ({ operation: getOperations(operation), file }));
}

// Tries to find a Pull Requests with "automatic", "sheet-update" Tags that belongs has its HEAD on the current branch.
async function findPr() {
  const currentBranch = await $`git rev-parse --abbrev-ref HEAD`.quiet();
  const jsonResponseShell =
    await $`gh search  prs --repo=${repository} --label automatic,sheet-update --state open --json url,title,body --head ${currentBranch}`.quiet();

  const response = JSON.parse(jsonResponseShell.stdout) as {
    url: string;
    title: string;
    body: string;
  }[];
  const x = 0;
  if (response.length === 0) {
    return undefined;
  }
  if (response.length > 1) {
    throw new Error(
      'More than one Automated open PR found! This should never happen. Please manually close the wrong PRs.'
    );
  }
  // There should never ever be more than 1 active PR
  return response[1];
}

const alreadyExistingPrData = await findPr();

const globalDiff = parseDiffOutput(
  (await $`git diff ${mainRemoteBranch} --name-status`.quiet()).stdout
).filter(
  // We only care about data-Changes. There *shouldnt* be any other changes, but hey.. you never know :P
  (e) => e.file.startsWith('src/data')
);

if (globalDiff.length === 0) {
  console.log(chalk.blue(`Base branch ${mainRemoteBranch} is in sync. There are no changes.`));
  if (alreadyExistingPrData) {
    // PR exists and needs to be closed
    await $`gh pr close ${alreadyExistingPrData.url} -c "PR was closed as there is no longer a difference between Sheets and Repository. (this action was performed automatically)"`;
  }
  exit(0);
}

// This checks the currently staged files.
const localDiff = parseDiffOutput((await $`git diff --name-status`.quiet()).stdout).filter(
  // We only care about data-Changes. There *shouldnt* be any other changes, but hey.. you never know :P
  (e) => e.file.startsWith('src/data')
);

if (localDiff.length === 0) {
  console.log(chalk.blue(`PR Branch ${mainRemoteBranch} is in sync. There are no local changes.`));
  // In case a PR is not open, create one.
  // TODO
  exit(0);
}

console.log(
  chalk.yellow(`PR Branch ${mainRemoteBranch} is out of sync. A commit is being prepared.`)
);
