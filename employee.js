const express = require('express');
const mysql = require('mysql');
var app = express()


app.use(express.json())



var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'

})



app.get("/Employee", (req, res) => {
    con.query("select * from Employee", (err, row, fileds) => {
        if (!err)
            res.end(JSON.stringify(row));

        else
            console.log(err);
    })
})
app.delete('/Employee/:id', (req, res) => {
    con.query("delete from Employee where id=?", [req.params.id], (err, row, fileds) => {
        if (!err)
            res.send("Deleted");
        else
            console.log(err);

    })
})


app.put("/Employee/:id", (req, res) => {
    const data = [req.body.name, req.body.address, req.body.salary, req.params.id]
    con.query("update Employee set name=?,address=?,salary=? where id=?", data, (err, result, fileds) => {

        if (err) throw err
        res.send("updatae succefully");

    })
})


app.post("/Employee", (req, res) => {
    const data = [req.body]
    con.query("insert into Employee set?", data, (err, result, fileds) => {
        if (err) throw err
        res.send("insert successfully")

    })
})
app.listen(6000, () => console.log("server 4000 create"))