#!/usr/bin/env node

import { program } from 'commander';
import { createRequire } from 'module';
import { createComponentAction } from './actions/index.mjs';

const require = createRequire(import.meta.url);
const pjson = require('./package.json');

program.name('rcli').version(pjson.version).description('React CLI');

program
  .command('component')
  .description('create a new component in the directory /src/components')
  .argument('<name>', 'name of the component')
  .action(createComponentAction);

program.parse(process.argv);
