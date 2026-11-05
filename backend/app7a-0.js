//CURD operations of students table of school database
/*
1. Initialize PROJECT
>npm init -y
The above command will initialize the project and will 
create a file package.json

2. >npm install express mysql8
Install express mysql8 in current folder

EXECUTION: To open index.html
GET http://localhost:3000/
*/
const express = require("express");
const mysql = require("mysql8");

const app = express();

app.use(express.json());

// Serve HTML files from Public folder
app.use(express.static("public"));

// Connect to school database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "school"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Error:");
        console.log(err.message);
        return;
    }

    console.log("Connected to MySQL");
});


// ========================================
// 1. GET ALL STUDENTS
// ========================================

app.get("/students", (req, res) => {

    db.query(
        "SELECT * FROM student",
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).send(err.message);
            }

            res.json(result);
        }
    );

});


// ========================================
// 2. GET ONE STUDENT
// ========================================

app.get("/students/:sno", (req, res) => {

    db.query(
        "SELECT * FROM student WHERE student_id=?",
        [req.params.sno],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).send(err.message);
            }

            res.json(result);
        }
    );

});


// ========================================
// 3. INSERT STUDENT
// ========================================

app.post("/student", (req, res) => {

    const { sno, name, total } = req.body;

    db.query(
        "INSERT INTO student(student_id, student_name, total) VALUES(?,?,?)",
        [sno, name, total],
        (err) => {

            if (err) {
                res.status(500).send(err.message);
                return;
            }

            res.send("Student Inserted");
        }
    );

});


// ========================================
// 4. UPDATE STUDENT
// ========================================

app.put("/student/:sno", (req, res) => {

    const { name, total } = req.body;

    db.query(
        "UPDATE student SET student_name=?, total=? WHERE student_id=?",
        [name, total, req.params.sno],
        (err, result) => {

            if (err) {
                res.status(500).send(err.message);
                return;
            }

            if (result.affectedRows == 0) {
                res.status(404).send("Student NOT found");
            }
            else {
                res.send("Student Updated");
            }
        }
    );

});


// ========================================
// 5. DELETE STUDENT
// ========================================

app.delete("/student/:sno", (req, res) => {

    db.query(
        "DELETE FROM student WHERE student_id=?",
        [req.params.sno],
        (err, result) => {

            if (err) {
                res.status(500).send(err.message);
                return;
            }

            if (result.affectedRows == 0) {
                res.status(404).send("Student NOT found to delete");
            }
            else {
                res.send("Student Deleted");
            }
        }
    );

});


// ========================================
// START SERVER
// ========================================

app.listen(3000, () => {

    console.log("Server running at http://localhost:3000");

});