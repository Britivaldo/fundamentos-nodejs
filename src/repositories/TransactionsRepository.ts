import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
      (accumulador: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulador.income += transaction.value;
            break;
          case 'outcome':
            // eslint-disable-next-line no-param-reassign
            accumulador.outcome += transaction.value;
            break;
          default:
            break;
        }
        return accumulador;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;
    /*
    const income = this.transactions
      .map(transction => {
        if (transction.type === 'income') {
          return transction.value;
        }
        return 0;
      })
      .reduce((sum, value) => sum + value);

    const outcome = this.transactions
      .map(transction => {
        if (transction.type === 'outcome') {
          return transction.value;
        }
        return 0;
      })
      .reduce((sum, value) => sum + value);

    const total = income - outcome;
      */
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
