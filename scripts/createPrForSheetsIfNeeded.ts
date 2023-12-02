import { $ } from 'zx';

// gh repo set-default $repo

const repository = process.env['TARGET_REPOSITORY']
  ? process.env['TARGET_REPOSITORY']
  : 'bastislack/highline-freestyle';

console.log(repository);
