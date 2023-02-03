import { parseISO } from 'date-fns';
import type { ToDo } from 'src/models';

export const BASE_URL = 'http://localhost:5000/api/todo/';

export const sendAdd = (todo: ToDo) => {
	return fetch(BASE_URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		},
		body: JSON.stringify(todo)
	});
};

export const sendUpdate = async (todo: ToDo) => {
	const response = await fetch(`${BASE_URL}${todo.id}`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		},
		body: JSON.stringify(todo)
	});
	return response.json();
};

export const sendDelete = (id: string) => {
	return fetch(`${BASE_URL}${id}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		},
		body: JSON.stringify(id)
	});
};

export const convert2ToDo = (obj: any) => {
	return {
		...obj,
		created_at: parseISO(obj.created_at),
		completed_at: obj.completed_at ? parseISO(obj.completed_at) : undefined
	} as ToDo;
};
