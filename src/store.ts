import { writable } from 'svelte/store';
import type { Filter, ToDo } from './models';

export const toDosStore = writable<ToDo[]>([]);
export const filterStore = writable<Filter>('ALL');
export const errorStore = writable<string>();
