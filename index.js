#!/usr/bin/env node

const { program } = require('commander');
const { version } = require('./package.json');
const { createComponentAction } = require('./actions');

program.name('rcli').version(version).description('React CLI');

program
  .command('component')
  .description('create a new component in the directory /src/components')
  .argument('<name>', 'name of the component')
  .action(createComponentAction);

program.parse(process.argv);
