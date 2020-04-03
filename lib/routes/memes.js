const { Router } = require('express');
const Meme = require('../models/Meme');

module.exports = Router()
  .post('/', (req, res, next) => {
    Meme
      .create(req.body)
      .then(meme => res.send(meme))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Meme
      .find()
      .then(memes => res.send(memes))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Meme
      .findById(req.params.id)
      .then(meme => res.send(meme))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Meme
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(meme => res.send(meme))
      .catch(next);
  });

// PUT /api/v1/memes/:id to update a meme
// DELETE /api/v1/memes/:id to delete a meme

