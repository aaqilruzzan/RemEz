const express = require('express')
const app = express()
const mongoose= require('mongoose')

//database
const database = module.exports = () =>{
    const connectionParams = {
        useNewUrlParser : true,
        useUnifieldTopology : true,
    
    }
    try{
        mongoose.connect(
            'mongodb+srv://REMEZ:REMEZ@cluster01.qrulfpd.mongodb.net/?retryWrites=true&w=majority',
            connectionParams
            );
        console.log("Database connected succesfully");
    } catch(error){
        console.log("Database connection failed");

    }
}

database();

app.listen(3000, () =>{
    console.log("Server is runing on port 3000");
});