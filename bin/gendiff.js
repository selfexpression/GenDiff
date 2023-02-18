#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    console.log(diff);
  });

program.parse(process.argv);
