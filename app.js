const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const main = require("./config.js");
const mongoStore = require("connect-mongo");
const cors = require("cors");
const authRoute = require("./routes/authRoute.js");
dotenv.config();
const app = express();


app.use(cors({
    origin : "http://localhost:5173" ,
    credentials : true
}));
app.use(express.json());

app.use(session({
    secret : process.env.secret ,
    resave : false ,
    saveUninitialized : false , 
    cookie : {secure : false , maxAge : 60000 , httpOnly : true} ,
    store : mongoStore.create({mongoUrl : process.env.url , collectionName: 'sessions'})
}))

main();


app.use("/api/v1/auth" , authRoute);


app.listen(process.env.PORT , ()=> {
    console.log("app is listening...");
});