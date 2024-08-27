const express = require ("express");
const app = express();
const port = 8000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4();
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname , "public")));

let posts = [
    {
        id : uuidv4() ,
        username : "Yash12",
        contant : "I love coding ",
    },

    {
        id : uuidv4(),
        username : "yash",
        contant : "I love coding ",
    },

    {
        id : uuidv4(),
        username : "yash123",
        contant : "I love  self",
    },
    
    {
        id : uuidv4() ,
        username : "Yash trivedi",
        contant : "I love coding ",
    },
];

app.get("/posts" , (req , res) => {
    res.render("index.ejs" , {posts});
});

app.get("/posts/new" , (req , res ) => {
    res.render("new.ejs");
});

app.post("/posts" , (req , res) => {
    let {username, contant } = req.body;
    let id = uuidv4();
    posts.push( { id , username , contant});
    res.redirect("/posts");
});

app.get("/posts/:id" , (req , res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs" , {post});
    
    
});

app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newContant = req.body.contant;
    let post = posts.find((p) => id === p.id);
    post.contant = newContant;
    console.log(post);
    // console.log(newContant);
    // console.log(id);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let newContant = req.body.contant;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" , {post});
});

app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newContant = req.body.contant;
     posts = posts.filter((p) => id !== p.id);
     res.redirect("/posts");
});



app.listen(port , () => {
    console.log("listening to port : 8000");
});