const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// find all categories
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});


// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryID = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryID) {
      res.status(404).json({ message: 'Could not find category by this ID' });
      return;
    }
    res.status(200).json(categoryID);
  } catch (error) {
    res.status(500).json(error);
  }
});


// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});


// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found or no changes made' });
    }
    res.json({ message: 'Category ID has been updated!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'Could not find category by this ID!' });
      return;
    }
    res.status(200).json({ message: 'Category has been deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
