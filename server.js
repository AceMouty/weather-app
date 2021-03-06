// Check if in production or not
if(process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const axios = require('axios')
const express = require("express")
const server = express()
const DARK_SKY_API_KEY = process.env.DARK_SKY_API_KEY

server.use(express.json())
server.use(express.static("public"))

server.post("/weather", (req, res) => {
  const {lat, lng} = req.body
  const url = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${lat},${lng}?units=auto`
  axios({ url, responseType: "json"})
    .then(apiRes => res.json(apiRes.data.currently))
})

server.listen(3000, () => console.log("Server running on port 3K"))