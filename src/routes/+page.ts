import { BASE_URL, convert2ToDo } from '../lib/api';
import type { ToDo } from '../models';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let todos: ToDo[] = [];
	try {
		const response = await fetch(BASE_URL, { method: 'GET' });
		const res = await response.json();
		todos = res.map(convert2ToDo);
		console.log(todos);
	} catch (error) {}
	return { todos };
};
