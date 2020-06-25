import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionsRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionsRouter.get('/', (request, response) => {
	const balance = transactionsRepository.getBalance();
	const transactions = transactionsRepository.all();

	const list = {
		transactions,
		balance,
	};

	return response.json(list);
});

transactionsRouter.post('/', (request, response) => {
	try {
		const { title, value, type } = request.body;

		const createTransactionService = new CreateTransactionService(
			transactionsRepository,
		);

		const transaction = createTransactionService.execute({
			title,
			value,
			type,
		});

		return response.json(transaction);
	} catch (err) {
		return response.status(400).json({ message: `${err.message}` });
	}
});

transactionsRouter.put('/:id', (request, response) => {
	const { id } = request.params;
	const { title, value, type } = request.body;

	const transactionFounded = transactionsRepository.findTransactionById({ id });

	const updatedTransaction = transactionsRepository.update(transactionFounded, {
		title,
		value,
		type,
	});

	return response.json(updatedTransaction);
});

export default transactionsRouter;
