import Transaction from '../models/Transaction';

interface Request {
	title: string;
	value: number;
	type: 'income' | 'outcome';
}

interface Balance {
	income: number;
	outcome: number;
	total: number;
}

interface transactionUpdateOrDelete {
	id: string;
	title: string;
	value: number;
	type: 'income' | 'outcome';
}

export default class TransactionsRepository {
	private transactionsRepository: Transaction[];

	constructor() {
		this.transactionsRepository = [];
	}

	public all(): Transaction[] {
		const transactions = this.transactionsRepository;

		return transactions;
	}

	public create({ title, value, type }: Request): Transaction {
		const transaction = new Transaction({ title, value, type });

		this.transactionsRepository.push(transaction);

		return transaction;
	}

	public getBalance(): Balance {
		const income = this.transactionsRepository.filter(
			transaction => transaction.type === 'income',
		);

		const outcome = this.transactionsRepository.filter(
			transaction => transaction.type === 'outcome',
		);

		const incomeValue = income.reduce(
			(total, transaction) => total + transaction.value,
			0,
		);

		const outcomeValue = outcome.reduce(
			(total, transaction) => total + transaction.value,
			0,
		);

		const finalBalance = incomeValue - outcomeValue;

		const balance = {
			income: incomeValue,
			outcome: outcomeValue,
			total: finalBalance,
		};

		return balance;
	}

	public findTransactionByIdAndUpdate(
		{ title, value, type }: Request,
		{ id }: Omit<transactionUpdateOrDelete, 'title' | 'value' | 'type'>,
	): number | null {
		const findTransactionIndexById = this.transactionsRepository.findIndex(
			transaction => transaction.id === id,
		);

		if (!findTransactionIndexById)
			throw Error('this transaction do not exists');

		this.transactionsRepository.splice(findTransactionIndexById);

		const updatedTransaction = {
			id,
			title,
			value,
			type,
		};
	}
}
