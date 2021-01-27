const express = require('express');
const router = express.Router();
const db = require('../models/index');

// カテゴリー一覧
router.get('/', async function(req, res) {
  const options = {
    include: [{
      model: db.todo
    }]
  };
  const categories = await db.category.findAll(options);
  res.render('categories/index.ejs', { categories: categories, errors: false });
});

router.post('/', async function(req, res) {
  const params = {
    name: req.body.categoryName
  };
  try {
    await db.category.create(params);
    res.redirect('/categories');
  } catch(e) {
    const categories = await db.category.findAll();
    res.render('categories/index.ejs', { categories: categories, errors: e.errors });
  }
});

router.get('/:id/edit', async function(req, res) {
  const category = await db.category.findByPk(req.params.id);
  res.render('categories/edit.ejs', { category: category, errors: false });
});

router.put('/:id', async function(req, res) {
  const params = {
    name: req.body.categoryName
  };
  const options = {
    where: {
      id: req.params.id
    }
  }
  try {
    await db.category.update(params, options);
    res.redirect('/categories');
  } catch(e) {
    const category = await db.category.findByPk(req.params.id);
    res.render('categories/edit', { category: category, errors: e.errors });
  }
})

router.delete('/:id', async function(req, res) {
  const options = {
    where: {
      id: req.params.id
    }
  };
  await db.category.destroy(options);
  res.redirect('/categories');
});

module.exports = router;