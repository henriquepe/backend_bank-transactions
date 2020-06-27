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

	public execute({ id, title, value = 0, type }: Request): Transaction {
		const balance = this.transactionsRepository.getBalance();

		const findTransactionIndexById = this.transactionsRepository.findIndex({
			id,
		});

		if (findTransactionIndexById === -1) {
			throw Error('this transaction do not exists');
		}

		const foundedTransaction = this.transactionsRepository.findTransaction({
			index: findTransactionIndexById,
		});

		const newIncome = balance.income - foundedTransaction.value;
		const newOutcome = balance.outcome + value;

		const updatedTransaction = {
			id,
			title,
			value,
			type,
		};

		if (foundedTransaction.type === 'income' && type === 'income') {
			this.transactionsRepository.update({
				index: findTransactionIndexById,
				transaction: updatedTransaction,
			});

			return updatedTransaction;
		}

		if (foundedTransaction.type === 'income' && type === 'outcome') {
			if (newOutcome <= newIncome) {
				this.transactionsRepository.update({
					index: findTransactionIndexById,
					transaction: updatedTransaction,
				});
				return updatedTransaction;
			}

			throw Error('This is a invalid outcome transaction');
		}

		if (foundedTransaction.type === 'outcome' && type === 'income') {
			this.transactionsRepository.update({
				index: findTransactionIndexById,
				transaction: updatedTransaction,
			});
			return updatedTransaction;
		}

		if (foundedTransaction.type === 'outcome' && type === 'outcome') {
			if (value <= balance.income) {
				this.transactionsRepository.update({
					index: findTransactionIndexById,
					transaction: updatedTransaction,
				});
				return updatedTransaction;
			}
			throw Error(
				'You do not have a valid balance, please review your incomes and outcomes.',
			);
		}

		return updatedTransaction;
	}
}
