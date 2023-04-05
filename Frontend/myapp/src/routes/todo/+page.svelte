<script>
    import {invalidateAll} from "$app/navigation";

    /** @type {import('./$types').PageData} */
    const URL = "http://localhost:3000/todos";

    export let data;

    console.log(data.todos)
    function addTodo() {
        const task = prompt("What's the task?");
        if (task != null) {
            const newTodo = {task: task, completed: false};
            fetch(URL, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(newTodo)})
                .then(() => invalidateAll())
                .catch((err) => console.log(err))
        }
    }

    function removeTodo(id) {
        fetch(URL + "/" + id, {method: "DELETE"})
            .then(() => invalidateAll())
            .catch((err) => console.log(err))
    }

    function toggleCompleted(todo) {
        todo.completed = !todo.completed;
        fetch(URL + "/" + todo._id, {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(todo)})
            .catch((err) => console.log(err));
    }

</script>

    <h1 id = "22">Todo List</h1>




<button class="btn" on:click={addTodo}>Add Task</button>


<ul>
    {#each data.todos as todo}
        <li class="todo" class:completed={todo.completed}>
            <input type="checkbox"
                   checked={todo.completed}
                   on:change={() => toggleCompleted(todo)} />
            {todo.task}
            <button class="btn padding" on:click={() => removeTodo(todo._id)}>Remove</button>
        </li>
    {/each}
</ul>

<style>

    .todo{
        margin-bottom: 5px;
    }

    .btn {
        background: linear-gradient(to bottom, #3498db, #2980b9);
        color: #fff;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 4px;
        transition: background 0.2s ease-in-out;
    }

    .btn.padding{
        padding: 5px 10px;
        font-size: 12px;
    }

    .btn:hover {
        background: linear-gradient(to bottom, #2980b9, #1f6699);
    }


    h1{
        background-color: gray;
        color: white;
        text-align: center;
        margin: 0 0 10px;
        padding: 20px;

    }

</style>