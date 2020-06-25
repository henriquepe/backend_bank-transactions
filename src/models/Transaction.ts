import { uuid } from 'uuidv4';

export default class Transaction {
	id: string;

	title: string;

	value: number;

	type: 'income' | 'outcome';

	constructor(title: string, value: number, type: 'income' | 'outcome') {
		this.id = uuid();
		this.title = title;
		this.value = value;
		this.type = type;
	}
}
