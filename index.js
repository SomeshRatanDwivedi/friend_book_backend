const express=require('express');
const PORT=8000;
const bodyParser=require('body-parser');
const db = require('./config/mongoose');
const passport=require('passport');
const passport_JWT=require('./config/passport_jwt_strategy');
const cors = require('cors');



const app=express();
const corsOpts = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOpts));

app.use(bodyParser.urlencoded({extended:true}));
app.use('/', require('./routes'));


























app.listen(PORT, ()=>{
    console.log(`App is listening on PORT- ${8000}`)
})






