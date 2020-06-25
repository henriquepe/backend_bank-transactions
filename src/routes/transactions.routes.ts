import { Router } from 'express';

const transactionsRouter = Router();

transactionsRouter.get('/', (request, response) => {
	return response.json({ message: 'transactionsRouter is ready! 🚗' });
});

export default transactionsRouter;
