const express = require("express");
const todoRouter = express.Router();
const Todo = require("./todo.model");

todoRouter
  .route("/")
  .get((req, res) => {
    Todo.find((err, todos) => {
      if (err) {
        console.log(err);
      } else {
        res.json(todos);
      }
    });
  })
  .post((req, res) => {
    // console.log(req.body);
    let todo = new Todo(req.body);
    todo
      .save()
      .then((todo) => {
        res.status(201).json({ todo: todo });
      })
      .catch((err) => res.status(400).send("failed to create todo."));
  });

todoRouter
  .route("/:id")
  .get((req, res) => {
    let { id } = req.params;
    Todo.findById(id, (err, todo) => {
      res.json(todo);
    });
  })
  .put((req, res) => {
    let { id } = req.params;
    Todo.findById(id, (err, todo) => {
      if (!todo) {
        res.status(400).send("todo not found.");
      }
      todo.description = req.body.description;
      todo.responsible = req.body.responsible;
      todo.priority = req.body.priority;
      todo.completed = req.body.completed;

      todo
        .save()
        .then((todo) => {
          res.json({ todo: "todo updated." });
        })
        .catch((err) => {
          res.status(400).send("failed to update todo.");
        });
    });
  })
  .delete((req, res) => {
    let { id } = req.params;
    Todo.findByIdAndDelete(id, (err, todo) => {
      if (err) console.log(err);
      res.status(204).send("todo deleted succussfully.");
    });
  });

module.exports = todoRouter;
