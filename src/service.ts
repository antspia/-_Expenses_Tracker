import { randomInt } from 'crypto';
import { expenses } from '.';
import { ExpenseCategory, Expense } from './public/data';

export function createExpense(name: string, amount: number, category: ExpenseCategory): Expense {
  return {
    id: randomInt(1000).toString(),
    name,
    amount,
    category,
    date: new Date()
  };
}
export function getAllExpenses(): Expense[] {
  return expenses;
}
export function getTotalAmount(): number {
  return expenses.reduce((sum: number, exp) => sum + exp.amount, 0);
}
export function getExpensesByCategory(category: ExpenseCategory): Expense[] {
  return expenses.filter(exp => exp.category === category);
}
