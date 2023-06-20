const express  = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json())
app.listen(8080, ()=>{
    console.log('Backend running and server up and running at 8080!');
})
