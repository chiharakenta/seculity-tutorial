const express = require('express');
const router = express.Router();
const db = require('../models/index');

// Todo一覧表示
router.get('/', async function(req, res) {
  const options = {
    include: [{
      model: db.todo
    }]
  };
  const categories = await db.category.findAll(options);
  res.render('todos/index.ejs', { categories: categories, errors: false });
})

/* 新規作成 */
router.post('/', async function(req, res) {
  const params = {
    category_id: req.body.categoryId,
    content: req.body.todoContent
  };
  try {
    await db.todo.create(params);
    res.redirect('/todos');
  } catch(e) {
    const options = {
      include: [{
        model: db.todo
      }]
    };
    const categories = await db.category.findAll(options);
    res.render('todos/index', { categories: categories, errors: e.errors });
  }
})

/* 編集 */
router.get('/:id/edit', async function(req, res) {
  const todo = await db.todo.findByPk(req.params.id);
  res.render('todos/edit.ejs', { todo: todo, errors: false });
});

/* 更新 */
router.put('/:id', async function(req, res) {
  const params = {
    content: req.body.todoContent
  };
  const options = {
    where: {
      id: req.params.id
    }
  };
  try {
    await db.todo.update(params, options);
    res.redirect('/todos');
  } catch(e) {
    const todo = await db.todo.findByPk(req.params.id);
    res.render('todos/edit', { todo: todo, errors: e.errors });
  }
});

/* 削除 */
router.delete('/:id', async function(req, res) {
  const options = {
    where: {
      id: req.params.id
    }
  };
  await db.todo.destroy(options);
  res.redirect('/todos');
});

module.exports = router;