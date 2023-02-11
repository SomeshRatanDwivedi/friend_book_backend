const mongoose=require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost/friend-book-db");

const db=mongoose.connection;

db.on('error', console.error.bind(console, "connection error"));

db.once('open', ()=> {
    console.log("Database is connected successfully");
});



module.exports=db;

