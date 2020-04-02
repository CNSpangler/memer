// POST /api/v1/memes to create a meme
// GET /api/v1/memes to get all memes
// GET /api/v1/memes/:id to get a meme by id
// PUT /api/v1/memes/:id to update a meme
// DELETE /api/v1/memes/:id to delete a meme

const { Router } = require('express');
const Meme = require('../models/Meme');

module.exports = Router()
  .post()