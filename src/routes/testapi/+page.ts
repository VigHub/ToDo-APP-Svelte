import type { PageLoad } from './$types';

export interface Pokemon {
	name: string;
	url: string;
}

export const load: PageLoad = async ({ fetch }) => {
	try {
        console.log("before")
		const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        console.log("getFetch")
		const jsonRes = await response.json();
        console.log(jsonRes.results)
		return {pok: jsonRes.results};
	} catch (error) {
		console.error(`Error in load function for /: ${error}`);
	}
};
