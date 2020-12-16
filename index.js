const express = require("express")
const cors = require("cors")
const app = express()
const axios = require("./axios")
const PORT = 4000 || process.env.PORT
require("dotenv").config()

app.use(cors())

const TMDB_API_KEY = process.env.TMDB_API_KEY

app.get("/", (req, res) => {
  const { page } = req.query
  return axios
    .get(
      `/discover/movie?sort_by=popularity.desc&api_key=${TMDB_API_KEY}&include_adult=false&page=${
        page ? page : 1
      }`
    )
    .then((r) => {
      console.log(r.data)
      return res.send(r.data)
    })
    .catch((err) => {
      console.log(err)
      return res.send(err)
    })
})

app.get("/find", (req, res) => {
  const { query } = req.query
  return axios
    .get(
      `/search/movie?api_key=${TMDB_API_KEY}&query=${query}&include_adult=false&page=1`
    )
    .then((r) => res.send(r.data))
    .catch((err) => err)
})

app.get("/movie", (req, res) => {
  const { movieId } = req.query
  return axios
    .get(`/movie/${movieId}?api_key=${TMDB_API_KEY}`)
    .then((r) => res.send(r.data))
    .catch((err) => err)
})

app.listen(PORT, () => console.log(`Running on ${PORT}`))
