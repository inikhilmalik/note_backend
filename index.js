const express=require("express");
const connection=require("./db");
const { userRouter } = require("./routes/User.routes");
const { noteRouter } = require("./routes/Note.routes");
const { auth } = require("./middlewares/Auth.middleware");
require("dotenv").config()
const cors=require("cors")

const app=express();

app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/user",userRouter)

app.use(auth);
app.use("/note",noteRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("connected to DB");
    }catch(err){
        console.log(err);
        console.log("cannot connect to DB");
    }
    console.log("server is running at port 8080")
})