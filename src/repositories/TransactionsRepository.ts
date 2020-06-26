import Transaction from '../models/Transaction';

interface Request {
	title: string;
	value: number;
	type: 'income' | 'outcome';
}

interface RequestForUpdate {
	index: number;
	transaction: Transaction;
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
		console.log(transactions);

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

	public findIndex({
		id,
	}: Omit<transactionUpdateOrDelete, 'title' | 'value' | 'type'>):
		| number
		| null {
		const index = this.transactionsRepository.findIndex(
			transaction => transaction.id === id,
		);

		return index || null;
	}

	public update({ index, transaction }: RequestForUpdate): void {
		this.transactionsRepository.splice(index, 1, transaction);
	}
}
