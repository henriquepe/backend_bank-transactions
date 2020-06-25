import express from 'express';
import transactionsRouter from './routes/transactions.routes';

const app = express();
app.use(express.json());
app.use('/transactions', transactionsRouter);

app.listen(3334, () => {
	console.log('🚀 server has been started');
});
