const todosRouter = require("express").Router();
const Todo = require("../models/todo");
const User = require("../models/user");
const mongoose = require("mongoose");

todosRouter.get("/", async (request, response) => {
	const user = request.user;
	// console.log(user);
	const todos = await Todo.find({user: user.id});
	return response.status(200).json(todos);
});

todosRouter.post("/", async (request, response) => {
	const user = request.user;
	const {text} = request.body;
	const newTodo = new Todo({
		text,
		checked: false,
		user: user.id,
	});
	// console.log(newTodo);
	const savedTodo = await newTodo.save();
	user.todos = user.todos.concat(savedTodo._id);
	await user.save();
	// console.log(savedTodo);

	return response.status(201).json(savedTodo);
});

todosRouter.delete("/:id", async (request, response) => {
	const user = request.user;
	const objectId = new mongoose.Types.ObjectId(request.params.id);
	console.log("prueba", objectId.toString());

	await Todo.findByIdAndDelete(request.params.id);
	// console.log("parametro", new ObjectId(request.params.id));

	user.todos.map((todo) => console.log("map", todo.toString()));
	user.todos = user.todos.filter(
		(todo) => todo.toString() != objectId.toString()
	);

	await user.save();
	// console.log(user.todos);

	return response.sendStatus(200);
});

todosRouter.patch("/:id", async (request, response) => {
	const user = request.user;

	const {checked} = request.body;

	await Todo.findByIdAndUpdate(request.params.id, {checked});

	return response.sendStatus(200);
});

module.exports = todosRouter;
