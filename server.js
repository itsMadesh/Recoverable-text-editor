const express = require('express');
// const db = require("./connection");
const insert = require("./ds");
const fs = require("fs");
const app = express();


app.use(express.static("ui/public"));

app.use(express.json());

app.get("/revision",(req,res)=>{
    console.log(req.body.content);
    fs.readFile("./file.json", function (err, data) {
        if (err) {
            console.error(err);
        }
        let content = JSON.parse(data);
        insert.getVersions(content.versions,"");
    });
});

app.post("/edit", (req, res) => {
    console.log(req.body.content);
    // console.log(db.getConnection());
    fs.readFile("./file.json", function (err, data) {
        if (err) {
            console.error(err);
        }
        let content = JSON.parse(data);
        insert.update(content.versions, req.body.content, 0)
        content = {
            "versions": content.versions,
            "current_version": req.body.content,
        }
        content=JSON.stringify(content);        
        fs.writeFile('./file.json',content, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("Data written successfully!");
        });
    });

    // db.getConnection().collection("versions").insertOne({content:req.body.content});
    // b = {
    //     versions:a,
    //     current_version:req.body.content,
    // }
    res.sendStatus(200);
});
const port = 8000;
app.listen(port, async (err) => {
    if (err) throw err;
    // await db.connect();
    console.log(`App running on http://localhost:${port}`)
});