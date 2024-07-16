import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,"public")))

app.get("/", function (req, res) {
  fs.readdir(`./files`, function(err,file){
    res.render("index", {file: file});
  })
  
});

app.post("/create", function (req, res) {
  fs.writeFile(`./files/${req.body.task.split(" ").join("")}.txt`, req.body.desc, function(err){
    res.redirect("/")
  })

});

app.listen(3000);
