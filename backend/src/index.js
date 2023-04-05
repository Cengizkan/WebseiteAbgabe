const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")
const port = 3000;
const todoDB = "mongodb://127.0.0.1/todoDB";

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

mongoose.connect(todoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);


app.get("/", (req, res) => {
    res.send("Willkommen auf der Startseite!");
});


app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        console.log(todos)
        res.json(todos);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.post("/todos", async (req, res) => {
    try {
        let task = req.body.task;
        let completed = req.body.completed;

        console.log("Request body: " + req.body.task);
        let newTodo = new Todo({
            task: task,
            completed: completed,
        });

        let savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { task, completed },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        res.json(deletedTodo);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server gestartet auf Port ${port}`);
});