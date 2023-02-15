#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();
program
  .version('0.0.1', '-v, --vers', 'output the current version')
  .description('-h', 'Compares two configuration files and shows a difference.');