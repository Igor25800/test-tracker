export interface transactionFormData {
  name: string;
  amount: number;
  category: TransactionCategory;
  date: Date;
  transactionType?: TransactionType;
}

export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

export enum TransactionCategory {
  Groceries = 'groceries',
  Salary = 'salary',
  Entertainment = 'entertainment',
}
