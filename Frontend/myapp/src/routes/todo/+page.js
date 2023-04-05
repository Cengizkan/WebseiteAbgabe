const URL = "http://localhost:3000/todos"


/** @type {import('./$types').PageLoad} */
export const load = async ({fetch}) => {
    const fetchTodos = async () => {
        let response = await fetch(URL);
        let json = await response.json();
        console.log(json)
        return json;
    }

    return {
        todos: await fetchTodos()
    }
}