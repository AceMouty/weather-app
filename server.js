// Check if in production or not
if(process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const server = express()
const DARK_SKY_API_KEY = process.env.DARK_SKY_API_KEY

server.use(express.json())
server.use(express.static("public"))

server.post("/weather", (req, res) => {

})

server.get("/", (req, res) => {
  return res.send("Welcome to the app")
})

server.listen(3000, () => console.log("Server running on port 3K"))