import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
	id: string;
	title: string;
	value: number;
	type: 'income' | 'outcome';
}

export default class UpdateTransactionsService {
	transactionsRepository: TransactionsRepository;

	constructor(transactionsRepository: TransactionsRepository) {
		this.transactionsRepository = transactionsRepository;
	}

	public execute({ id, title, value, type }: Request): Transaction {
		const balance = this.transactionsRepository.getBalance();

		if (type === 'outcome' && value > balance.total)
			throw Error('this is a invalid outcome transaction');

		const findTransactionIndexById = this.transactionsRepository.findIndex({
			id,
		});

		console.log(findTransactionIndexById);

		if (findTransactionIndexById == null) {
			throw Error('this transaction do not exists');
		}

		const updatedTransaction = {
			id,
			title,
			value,
			type,
		};

		this.transactionsRepository.update({
			index: findTransactionIndexById,
			transaction: updatedTransaction,
		});

		return updatedTransaction;
	}
}
