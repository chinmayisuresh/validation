const express=require("express");

const app = express();
app.use(express.json());

const connect = require("./config/db")


const usercontroller = require("./controllers/user.controller");

app.use("/users", usercontroller);



app.listen(2446, () => {
    connect();
    console.log("listening 2446")
})



