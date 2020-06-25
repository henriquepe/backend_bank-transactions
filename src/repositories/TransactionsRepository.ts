import Transaction from '../models/Transaction';

export default class TransactionsRepository {
	transactionsRepository: Transaction[];

	constructor() {
		this.transactionsRepository = [];
	}
}
