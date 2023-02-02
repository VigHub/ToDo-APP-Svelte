import { parseISO } from 'date-fns';
import type { ToDo } from 'src/models';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const res = await fetch('http://localhost:5000/api/todo');
		const resJson = await res.json();
		//console.log(resJson);
		return {
			todos: resJson.map(
				(r: any) =>
					({
						...r,
						created_at: parseISO(r.created_at),
						completed_at: r.completed_at ? parseISO(r.completed_at) : undefined
					} as ToDo)
			)
		};
	} catch (error) {
		console.log(error);
	}
	return { todos: [] };
};
