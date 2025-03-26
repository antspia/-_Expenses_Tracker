import * as readline from 'readline';
import { Expense } from './public/data';
import { showMenu } from './view';

export const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export const expenses: Expense[] = [];

showMenu();