
const express = require('express');
const app = express();
const router = require("./routers/mens.js");

const port = process.env.PORT || 5000;

// connecting to database
require("../src/db/connection.js");


// for json -> req.body
app.use(express.json());

// register our router
app.use(router);

// host
app.listen(port, ()=>{
    console.log(`connecting to port ${port}`);
});