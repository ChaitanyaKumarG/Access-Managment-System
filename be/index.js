const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = process.env.PORT || 2323



app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.json())

const userRoutes = require("./routes/userRoutes")
app.use("/users", userRoutes)

app.get('/', (req, res, next)=>{
    res.send("welcome to server")
})

app.listen(port, ()=>{
    console.log(`server started at port no: ${port}`);   
})