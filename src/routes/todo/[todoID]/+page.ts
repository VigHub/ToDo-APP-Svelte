import { parseISO } from 'date-fns';
import type { ToDo } from 'src/models';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	let todo: ToDo = {
		title: '',
		id: 'id',
		completed: false,
		created_at: new Date()
	};
	try {
		const res = await fetch(`http://localhost:5000/api/todo/${params.todoID}`);
		const r = await res.json();
		//console.log(resJson);
		todo = {
			...r,
			created_at: parseISO(r.created_at),
			completed_at: r.completed_at ? parseISO(r.completed_at) : undefined
		} as ToDo;
	} catch (error) {
		console.log(error);
	}
	return { todo };
};
