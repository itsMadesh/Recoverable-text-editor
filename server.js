const express = require('express');
const TrieHelper = require("./TrieHelper");
const fs = require("fs");
const app = express();

app.use(express.static("ui/public"));

app.use(express.json());

app.get("/revisions", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./file.json", "utf-8"));
    const revisions = TrieHelper.getAllVersions(data.trie, "");
    console.log("revisions:", revisions);
    res.json({ revisions });
});

app.post("/edit", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./file.json", "utf-8"));
    TrieHelper.update(data.trie, req.body.content, 0);
    const new_data = {
        "trie": data.trie,
        "current_version": req.body.content,
    };
    fs.writeFileSync('./file.json', JSON.stringify(new_data, null, 4));
    console.log("Data written successfully!");
    res.sendStatus(200);
});

const port = process.env.PORT || 8000;
app.listen(port, async (err) => {
    if (err) throw err;
    console.log(`App running on http://localhost:${port}`)
});