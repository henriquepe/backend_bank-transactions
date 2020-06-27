import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestForDelete {
	id: string;
}

export default class DeleteTransactionsService {
	private transactionsRepository: TransactionsRepository;

	constructor(transactionsRepository: TransactionsRepository) {
		this.transactionsRepository = transactionsRepository;
	}

	public execute({
		id,
	}: RequestForDelete){
		): Transaction | null {
			const transactionIndexToDelete = this.findIndex({ id });

			if (transactionIndexToDelete === -1)
				throw Error('This transaction can not be deleted! (not found)');

			const transactionToDelete = this.transactionsRepository.find(
				transaction => transaction.id === id,
			);

			this.transactionsRepository.splice(transactionIndexToDelete, 1);

			return transactionToDelete || null;
	}
}
