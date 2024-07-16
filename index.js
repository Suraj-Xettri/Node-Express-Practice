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


app.get("/files/:fileName", function (req, res) {
  fs.readFile(`./files/${req.params.fileName}`,"utf-8",function(err, filedata){
    res.render('./show', {filename: req.params.fileName, filedata: filedata})
  })
  
});

app.get("/edit/:fileName", function (req, res) {
  fs.readFile(`./files/${req.params.fileName}`,"utf-8",function(err){
    res.render('./edit', {filename: req.params.fileName})
  })
  
});

app.post("/create", function (req, res) {
  fs.writeFile(`./files/${req.body.task.split(" ").join("")}.txt`, req.body.desc, function(err){
    res.redirect("/")
  })

});

app.post("/edit", function (req, res) {
    fs.rename(`./files/${req.body.prev}`, `./files/${req.body.update}`, function(err){
      res.redirect("/")
    })
    
  })

app.listen(3000);
