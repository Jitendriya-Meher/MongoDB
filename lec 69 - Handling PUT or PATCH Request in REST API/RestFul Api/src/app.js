
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


// create a new student 
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

// read the data of registered students
app.get("/students" , async (req, res) => {

    try{
        const studentDetails = await Student.find();
        console.log("studentDetails : ", studentDetails);
        res.send(studentDetails);
    }
    catch(err){
        console.log("error in get students : ",err)
    }
});

// get the individual students details by id
app.get("/students/:id" , async (req, res) => {

    try{
        const _id = req.params.id;
        // const studentDetails = await Student.find({_id});
        const studentDetails = await Student.findById(_id);

        // if student not found
        if( ! studentDetails){
            return res.status(404).send("student not found");
        }
        else{
            console.log("individual studentDetails : ", studentDetails);
            res.status(201).send(studentDetails);
        }
    }
    catch(err){
        console.log("error in get students : ",err)
    }
});

// delete the student details by id
app.delete("/students/:id" , async (req, res) => {

    try{
        const _id = req.params.id;
        // const studentDetails = await Student.find({_id});
        const deletedStudent = await Student.findByIdAndDelete(_id);

        // if student not found
        if( ! deletedStudent){
            return res.status(404).send("student not found");
        }
        else{
            console.log("deleted studentDetails : ", deletedStudent);
            res.status(201).send(deletedStudent);
        }
    }
    catch(err){
        console.log("error in deleting students : ",err);
    }
});

// PUT (Update):

// Purpose: The "PUT" method is used to update an existing resource or create a new resource if it doesn't exist.
// Idempotent: It is idempotent, meaning that if you make the same request multiple times, the result should be the same as making it once.
// Usage: When you want to completely replace the existing resource with the new data you provide. In other words, you send the entire updated representation of the resource.
// Example: If you have a user resource and want to update the entire user's information, you might use "PUT".

// PATCH (Partial Update):

// Purpose: The "PATCH" method is used to make partial modifications to an existing resource.
// Idempotent: It should be idempotent, meaning that making the same request multiple times should have the same result as making it once.
// Usage: When you want to apply partial updates to a resource, meaning you send only the fields that need to be updated, and the server applies those changes without affecting the rest of the resource.
// Example: If you have a user resource and only want to update the user's email address, you might use "PATCH".

// update the student details by id
app.patch("/students/:id", async(req, res) => {

    try{
        const _id = req.params.id;
        const updateDetails = await Student.findByIdAndUpdate(_id, req.body,{
            new: true
        });

        if( ! updateDetails){
            return res.status(404).send("student not found");
        }
        else{
            console.log("deleted studentDetails : ", updateDetails);
            res.status(201).send(updateDetails);
        }
    }
    catch(err){
        console.log("error in updating students : ",err);
    }
});



// host
app.listen(port,() => {
    console.log(`connection is setup at ${port}`);
});