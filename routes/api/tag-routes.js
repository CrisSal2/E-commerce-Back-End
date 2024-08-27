const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint


// find all tags
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});


// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tag) {
      res.status(404).json({ message: 'Could not find tag by this ID!'});
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});


// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err)
  }
});


// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Tag not found or no changes made' });
    }
    res.json({ message: 'Tag ID has been updated!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'Could not find tag by this ID!' });
      return;
    }
    res.status(200).json({ message: 'Tag has been deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
