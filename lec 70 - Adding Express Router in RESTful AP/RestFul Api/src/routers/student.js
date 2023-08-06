
const express = require('express');

// 1. create a new router
const router = new express.Router();

// get the schema
const Student = require("../models/students.js");

// routing
router.get('/', (req, res) =>{
    res.send("Welcome to HOME PAGE!");
});

// create a new student 
router.post("/students", async (req, res) => {

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
router.get("/students" , async (req, res) => {

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
router.get("/students/:id" , async (req, res) => {

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
router.delete("/students/:id" , async (req, res) => {

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


// update the student details by id
router.patch("/students/:id", async(req, res) => {

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

// 2. we need to deg=fine the router
router.get("/jiksss", (req, res) =>{
    res.send("Welcome jiksss!");
})


module.exports = router;
