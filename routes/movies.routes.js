const express = require('express')
const Movie = require('../models/Movie.model')
const router = express.Router()

const uploader = require('./../config/uploader.config')


router.get("/", (req, res, next) => {

  Movie
    .find()
    .select({ description: 0 })
    .then(movies => res.render("movies/list", { movies }))
    .catch(err => console.log(err))
})

router.get("/crear", (req, res, next) => {
  res.render("movies/create")
})

router.post("/crear", uploader.single('imageField'), (req, res, next) => {

  const { title, description } = req.body

  Movie
    .create({ title, description, imageUrl: req.file.path })
    .then(() => res.redirect('/peliculas'))
    .catch(err => console.log(err))
})

module.exports = router