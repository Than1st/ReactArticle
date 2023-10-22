require('dotenv').config()
const express = require('express')
const cors = require('cors')
const route = require("./routes");
const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(route)
app.listen(port, ()=>{
    console.log(`Server Listening ${port}`)
    console.log(`http://localhost:${port}`)
})