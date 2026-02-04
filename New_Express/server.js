import express from 'express';
import {userData} from './data.js';
import { mid1, validationpost } from "./middleware.js"
const app = express();
// // const port=3000;
import { mid1, validationpost } from "./middleware.js"

app.use(express.json())

//req -> middleware -> res

app.use(mid1)
// // http://localhost:3000
app.get("/", (req, res) => {
    res.send("This is my Home Page");
});

// http://localhost:3000/user
app.get("/user",(req,res)=>{
    // let user ={
    //     Name:"Manuradha",
    //     Age:"20",
    //     Course:"Btech",
    //     Adress:"Uttar Pradesh"
    // }
    // res.json(user);
    const user=userData;
    return res.json(user);
})

// http://localhost:3000/user/2
app.get("/user/:id",(req,res)=>{
    //const id = req.params.id;
    const id=parseInt(req.params.id);
    const user=userData.find((ele) => ele.id == id);
    return res.json(user);
});

// http://localhost:3000/search?name=manu&password="u1u1u1"
app.get("/search",(req,res)=>{
    console.log(req.query);
    const username= req.query.name;
    //res.send(username);
    const pass= req.query.password;
    //res.send(pass);
    res.send({
      username,pass
    })
})
app.get("/about", (req,res)=>{
    res.send("This is my Aboute Page");
});

app.post("/user",(req,res)=>{
    // let userNewdata=req.body;
    // console.log(userNewdata);
    // res.send("user created");
    let {name,city}=req.body;
    if(!name || !city){
        //return res.send("plz fill all the details");
        return res.status(400).send("fill all the details");
    };
    let userNewData ={
        id:userData.length+1,
        name:name,
        city:city
    }
    userData.push(userNewData)
    res.send("user created");
})


//app.listen(port, ()=>{console.log("server on port 3000")})
app.listen(3000, () => {
    console.log("Server is running on port 3000")
});