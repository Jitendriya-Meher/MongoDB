
// import express
const express = require('express');
const app = express();

// connect to database
require("./db/connection");

// port number
const port = process.env.PORT || 7000;

// middle wire for ->  (req.body) to recoginze json object
app.use(express.json());


// // 1. create a new router
// const router = new express.Router();

// // 2. we need to deg=fine the router
// router.get("/jiksss", (req, res) =>{
//     res.send("Welcome jiksss!");
// })

// // 3. we need to ragister our route
// app.use(router);


const router = require("./routers/student.js");
app.use(router);


// host
app.listen(port,() => {
    console.log(`connection is setup at ${port}`);
});