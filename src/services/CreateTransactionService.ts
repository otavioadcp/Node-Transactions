import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, title, type }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Invalid transaction type!');
    }

    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > total) {
      throw Error('Invalid outcome!');
    }

    const transaction = this.transactionsRepository.create({
      value,
      title,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
