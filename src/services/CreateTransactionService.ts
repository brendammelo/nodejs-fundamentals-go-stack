import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  value: number;
  title: string;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (value <= 0) {
      throw new Error(`You can't use negative values.`);
    }
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.outcome + value > balance.total) {
        throw new Error(`You don't have enough money for this outcome.`);
      }
    }
    const transaction = this.transactionsRepository.create({
      type,
      title,
      value,
    });
    return transaction;
  }
}

export default CreateTransactionService;
