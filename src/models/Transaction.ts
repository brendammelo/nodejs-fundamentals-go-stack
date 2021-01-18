import { v4 as uuid } from 'uuid';

class Transaction {
  id: string;

  title: string;

  value: number;

  type: 'income' | 'outcome';

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.type = type;
    this.value = value;
  }
}

export default Transaction;
