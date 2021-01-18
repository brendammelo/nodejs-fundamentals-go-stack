import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  type: 'outcome' | 'income';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (count: Balance, transaction: Transaction) => {
        if (transaction.type === 'income') {
          count.income += transaction.value;
        }
        if (transaction.type === 'outcome') {
          count.outcome += transaction.value;
        }
        return count;
      },
      { income: 0, outcome: 0, total: 0 },
    );
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
