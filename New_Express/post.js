const express = require("express");
const app = express();
app.use(express.json());
const credentials = [
    { email: "aman@gmail.com", password: "234344" },
    { email: "yash@gmail.com", password: "123r44" },
];

app.post("/auth/register", async (req, res) => {
    const data = req.body;
    //check if user already exists
    const existingUser = credentials.find((cred) => cred.email == data.email && cred.password == data.password);
    const pass_valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    const email_valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!pass_valid.test(data.password)) {
        return res.status(400).send("Password must be 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character");
    }
    else if (!email_valid.test(data.email)) {
        return res.status(400).send("Invalid Email Format");
    }
    else if(existingUser) {
        return res.status(400).send("User Already Exist ");
    }
    credentials.push(data);
    res.send("Registered Successful");
});

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = credentials.find(
        (cred) => cred.email == email && cred.password == password,
    );
    console.log(user);
    if (user) {
        res.send({ message: "Login Successful", user });
    } else {
        res.send("Invalid Credential");
    }
});
app.listen(3000, () => console.log("Server Started"));