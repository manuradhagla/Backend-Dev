const express= require('express');
const app = express();

//in put we update the data
app.use(express.json());

let credentials =[
    {email:"manu6@gmail.com",password:"1234"},
    {email:"radha12@gmail.com",password:"1111"}
];

//get request
app.get("/auth/user",(req,res)=>{
    res.json({message:"User Fetch successfully" , credentials});
});

//put request-- reset password route
app.put("/auth/reset", (req,res) =>{
    const {email, password, newpassword}=req.body;
    //find user
    const user = credentials.find(
        (cred)=> cred.email== email && cred.password==password,
    );

    if(!user){
        return res.status(400).json({message: "Invalid email or password"})
    }
    //update password
    user.password= newpassword;
    res.json({message: "password updated Successfully",user});
});
    
    // forget password
app.put("/auth/forget", (req,res) =>{
    const {email, newpassword}= req.body;
    const user = credentials.find(
        (cred) => cred.email == email,
    )
    if(!user){
        return res.status(400).json({message: "Invalid email"})
    }
    user.password= newpassword;
    res.json({message: "password updated Successfully",user});
});


app.put("/auth/resetE", (req,res) =>{
    const {password, newemail} =req.body;
    const user = credentials.find(
        (cred) => cred.password==password,
    )
    if(!user){
        return res.status(400).json({message: "wrong password to change the email"})
    }
    user.email = newemail;
    res.json({message:"Email change successfully",user})
})

app.listen(3000,()=> console.log("Server started on portal 3000"));