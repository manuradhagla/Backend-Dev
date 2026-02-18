const express = require('express');
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//REST API
//GET Method
// app.get("/users" ,(req,res) =>{
//     res.json(users);
// });
app.get("/api/users", (req,res) =>{
    res.json(users);
});

// get user by id
app.get("/api/users/:id",(req,res)=>{
    const id = req.params.id;
    const user = users.find((u)=> u.id == id);
    return res.json(user);
})
//Dynamic Path Parametrs
app.get("/users", (req,res) =>{
    const html = `
    <ul>
        ${users.map((user)=> `<li> ${user.first_name} ${user.last_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

//post method
app.post("/api/users", (req,res) =>{
    //ToDo: create a new user;
    const{first_name,last_name, email, gender, job_title} = req.body;
    const newUser ={
        id: users.length+1,
        first_name,
        last_name,
        email,
        gender,
        job_title,
    };
    users.push(newUser);
    //JSON.stringify(users,null,2) here 2 means 2 spaces agter adding data/null value
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users,null,2),() =>{
        res.status(201).json({
            msg:"User created Successfully",
            user:newUser,
        });
    });
});

app.patch("/api/users/:id", (req, res) => {
    //ToDo: updaate user;
    const id = req.params.id;
    const user = users.findIndex((u) => u.id == id);
    if(user === -1){
        return res.status(404).json({ msg: "User not found" });
    }else{
        const last_name = req.body.last_name;
        users[user].last_name = last_name || users[user].last_name;
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
            res.json({
                msg: "User updated Successfully",
                user: users[user],
            });
        });
    }
});


app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const userIndex = users.findIndex((u) => u.id == id);
    if (userIndex === -1) {
        return res.status(404).json({ msg: "User not found" });
    }
    users.splice(userIndex, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
        res.json({
            msg: "User deleted Successfully",
        });
    });
});

//same api with same route
// app.route("/api/users/:id")
// .get((req,res) =>{
//     const id = req.params.id;
//     const user = users.find((u) => u.id == id);
//     return res.json(user);
// })
// .post((req,res)=>{
//     return res.json({ msg: "user created successfullt" });
// })
// .patch((req, res) => {
//     return res.json({ msg: "user updated successfullt" });
// })
// .delete((req, res) => {
//     return res.json({ msg: "user deleted successfullt" });
// })

app.listen(8000, () => console.log("Server running on port 8000"));