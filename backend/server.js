const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();


const app = express();
const router = express.Router();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/',(req,res)=>{
    res.send("Welcome to Bhargav's Backend CA2!!!");
});

const users = [
    {email: "me@gmail.com", name: "Me" },
    {email: "you@gmail.com", name: "You"},
];

router.put('/update', async(req,res)=>{
    const {email,name} = req.body;
    try{
        const updatedUser = await users({email, name});
        updatedUser.save();
    }
    catch(err){
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.delete('/delete', async(req,res)=>{
    const {email,name} = req.body;
    try{
        if(!email) return res.status(400).json({message: "email needed"});
        users.find(email).delete;
    }
    catch(err){
        res.status(500).json({message: "Internal Server Error"});
    }
});


app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})