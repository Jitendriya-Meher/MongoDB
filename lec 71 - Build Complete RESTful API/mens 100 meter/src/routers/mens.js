
const express = require('express');
// create router
const router = new express.Router();


// model or collection
const MensRanking = require("../models/mens.js");


// post req
router.post("/mens", async (req, res) => {

    try{
        const records = new MensRanking(req.body);

        const data = await records.save();

        console.log("post : ",data);
        res.status(201).send(data);
    }
    catch(err){
        console.log("error in post : ",err);
        res.status(400).send("cant save data ",err);
    }
});

// get req
// all
router.get("/mens", async (req, res) => {

    try{
        // sort the athlete by ranking
        const datas = await MensRanking.find({}).sort({"ranking":1});
        
        res.status(201).send(datas);
    }
    catch(err){
        console.log("error in post : ",err);
        res.status(400).send("cant save data ",err);
    }
});

// get req
// individual request by id
router.get("/mens/:id", async (req, res) => {

    try{
        const _id = req.params.id;

        // const data = await MensRanking.find({_id});
        const data = await MensRanking.findById(_id);

        if( !data){
            return res.status(404).send("Athlete not found !!");
        }
        
        res.status(201).send(data);
    }
    catch(err){
        console.log("error in post : ",err);
        res.status(400).send("cant save data ",err);
    }
});


// patch req
// individual request by id
router.delete("/mens/:id", async (req, res) => {

    try{
        const _id = req.params.id;

        // const data = await MensRanking.find({_id});
        const data = await MensRanking.findByIdAndDelete(_id);

        if( !data){
            return res.status(404).send("Athlete not found !!");
        }
        
        res.status(201).send(data);
    }
    catch(err){
        console.log("error in post : ",err);
        res.status(400).send("cant save data ",err);
    }
});


// delete req by id
router.patch("/mens/:id", async (req, res) => {

    try{
        const _id = req.params.id;

        // const data = await MensRanking.find({_id});
        const data = await MensRanking.findByIdAndUpdate(_id,req.body,{
            new:true
        });

        if( !data){
            return res.status(404).send("Athlete not found !!");
        }
        
        res.status(201).send(data);
    }
    catch(err){
        console.log("error in post : ",err);
        res.status(400).send("cant save data ",err);
    }
});

module.exports = router;