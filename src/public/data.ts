export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
}
export enum ExpenseCategory {
  Food = 'Food',
  Transport = 'Transport',
  Entertainment = 'Entertainment',
  Fee = 'Fee',
  Friends = 'Friends',
  Sport = 'Sport'
}
