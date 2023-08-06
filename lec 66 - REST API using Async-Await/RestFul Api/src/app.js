
// import express
const express = require('express');
const app = express();

// connect to database
require("./db/connection");

// get the schema
const Student = require("./models/students.js");

// port number
const port = process.env.PORT || 7000;

// middle wire for ->  (req.body) to recoginze json object
app.use(express.json());

// routing
app.get('/', (req, res) =>{
    res.send("Welcome to HOME PAGE!");
});

app.get('/students', (req, res) =>{
    res.send("Welcome to Students PAGE!");
});


// create a new student 
// app.post("/students", (req, res) => {

//     console.log("at studnt page");
//     console.log("data : ",req.body);

//     const user = new Student(req.body);

//     // as it return promises 
//     user.save().then( ()=>{
//         console.log("student successfully registered", user);
//         res.status(201).send(user);
//     }).catch( (err) => {
//         console.log("registration failed", err);
//         res.status(400).send(err);
//     });

// });

// async await 
app.post("/students", async (req, res) => {

    console.log("at studnt page");
    console.log("data : ",req.body);

    
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        console.log("student successfully registered", createUser);
        res.status(201).send(createUser);
    }
    catch(err){
        console.log("registration failed", err);
        res.status(400).send(err);
    }
});



// host
app.listen(port,() => {
    console.log(`connection is setup at ${port}`);
});