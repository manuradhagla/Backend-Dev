const express = require('express');// it is a framework which is used to build web application and APIs

const app = express(); // it is express application which is used to handle the request and response
app.use(express.json()); // it is used to parse the json data from the request body

let students = [
    { id: 1, name: "Manu", marks: 87, city: "Mathura" },
    { id: 2, name: "Aman", marks: 76, city: "Agra" }
];

//view student data
app.get("/student", (req, res) => {
    res.json(students);
});

//Patch- 
app.patch("/student/:id", (req, res) => {
    // const id = req.params.id; // to fatch the data by id(:id) of students(params) on http(req)
    // const updates = req.body;
    // const student = students.find((s) => s.id == id);
    // if (!student) {
    //     return res.status(404).json({ message: "Student not found wrong ID" });
    // };
    // //Apply partial updates
    // Object.assign(student, updates);
    // res.json({ message: "Student update successfully" });

    // Show changes for only marks if name and city chnage then show error
    const id = req.params.id;
    const updates= req.body.marks;
    const student = students.find((s)=>s.id==id);
    if(!student){
        return res.status(404).json({message:"Student not found wrong ID"});
    };
    if(req.body.id || req.body.name || req.body.city){
        return res.status(400).json({message:"Only marks can be updated"});
    }
    Object.assign(student,{marks:updates});
    //students.marks= updates;
    res.json({message:"Student marks updated successfully"});
});

app.listen(3000, () => console.log("Server running on Port 3000"));