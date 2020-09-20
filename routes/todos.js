const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({})
    res.status(200);
    res.send(todos);
  } catch (e) {
    res.status(500).send(`Internal Server Error: ${e}`);
  }
})

router.post("/todos", async (req, res) => {
  const todo = new Todo({
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed,
  });
    try {
      const name = req.body.name;
      const todos = await Todo.find({});
      const duplicate = todos.find((todo) => todo.name === name);
      if(duplicate){
        res.status(400).send('Bad Request: Todo already exists!');
      } else {
        await todo.save();
        res.status(201).send(todo);
      }
    } catch (e) {
      res.status(400).send(`Bad Request: ${e}`);
    }
});

router.delete('/todos/:id', async (req, res) => {
  const {id} = req.params;
  try {
    await Todo.deleteOne({_id: id});
    res.status(200);
    res.send(`Todo - ID: ${id} - was successfully deleted!`);
  } catch (e) {
    res.status(500);
    res.send(`Internal Server Error: ${e}`);
  }
});

router.put('/todos/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const todo = await Todo.findOneAndUpdate({_id: id}, {$set: {...req.body}});
    if(!todo){
      res.status(400);
      res.send('Bad Request: There is no item with such id!')
    } else {
      res.status(200);
      res.send(`Todo - ID: ${id} -  was successfully updated!`);
    }
  } catch (e) {
      res.status(500);
      res.send(`Internal Server Error: ${e}`);
  }
});

module.exports = router