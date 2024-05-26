/*
 Student DB API 
 Created and written
 by Paul E. Coke (c)2024

 This app was created using the XAMPP stack 
 with a simple mysql backend database with a "students" table,
 containging 3 fields namely id, name and age. All routes were 
 tested using the "Postman" application. 
*/
const express = require("express");
const app = express(); 
const cors = require("cors");
const mysql = require("mysql");
const PORT = 8080;

//Configure Middleware
app.use(cors());
app.use(express.json());

//Create DB Connection
const mydb = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database:"studentDB"

});

//Check that we are connected to the DB
mydb.connect((err)=>{

    if(err){

        console.log(err.message);
    }
    else{

        console.log("You are connected to the DB");
    }

})

/* SET UP ROUTES */ 

//CREATE STUDENT
app.post("/students", (req, res)=>{

    const sql = "INSERT INTO students(name, age) VALUES (?)";
    const values = [
        req.body.name, 
        req.body.age
    ];

    mydb.query(sql, [values], (err, result)=>{

       if(err){

            return res.json({"Message": err.message});
       }else{

        return res.json({"Message": "Student successfully created"});
       }
    
    });

});

//READ ALL STUDENTS
app.get("/students", (req, res)=>{

    const sql = "SELECT * FROM students";

    mydb.query(sql, (err, result)=>{

       if(err){

            return res.json({"Message": "An error has occurred"});
       }else{

        return res.json(result);
       }
    
    });

});

//READ SINGLE STUDENT
app.get("/students/:studentid", (req, res)=>{

    const id = req.params.studentid;
    const sql = "SELECT * FROM students WHERE id = ?";

    mydb.query(sql, id, (err, result)=>{

       if(err){

            return res.json({"Message": "An error has occurred"});
       }else{

        return res.json(result);
       }
    
    });

});


//UPDATE STUDENT
app.put("/students/:id", (req, res)=>{

    const id = req.params.id;
    
    const sql = "UPDATE students SET name = ?, age = ? WHERE id = ?";

    mydb.query(sql, [req.body.name, req.body.age, id], (err, result)=>{

       if(err){

            return res.json({"Message": err.message});

       }else{

        return res.json({"Message": "Student successfully updated"});

       }
    
    });

});

//DELETE STUDENT
app.delete("/students/:studentid", (req, res)=>{

    const id = req.params.studentid;
    const sql = "DELETE FROM students WHERE id = ?";

    mydb.query(sql, id, (err, result)=>{

       if(err){

            return res.json({"Message": "An error has occurred"});

       }else{

        return res.json({"Message": "Student successfully deleted"});
       }
    
    });

});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));