//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to Knowledge Zone!! Here you can post/publish your knowledge about some areas and everyone can see your post. You can see every posts just below this and you can also navigate to new page to see full blog/post of any user by just clicking Read more option. You can post a blog by clicking the below Publish button.";
const aboutContent = "Welcome to Knowledge Zone, a website dedicated to Read or Write blogs. Our mission is to connect more people who can share their knowledge to everyone.";
const contactContent = "Thank you for visiting our website. If you have any questions, comments or suggestions, please do not hesitate to contact us using the email id given below. We will do our best to respond to your inquiry as soon as possible.";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts=[];

app.get("/",function(req,res){
  // console.log(posts);
  res.render(__dirname + "/views/home.ejs" , {homeStartingContent: homeStartingContent,
                                              posts:posts});
});

app.post("/",function(req,res){
  res.redirect("/compose");
})

app.get("/about",function(req,res){
  res.render(__dirname + "/views/about.ejs" , {aboutContent: aboutContent});
});

app.get("/contact",function(req,res){
  res.render(__dirname + "/views/contact.ejs" , {contactContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render(__dirname + "/views/compose.ejs");
});

app.post("/compose",function(req,res){
  const post = {
    title : req.body.postTitle,
    content : req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});


app.get("/post/:postName",function(req,res){
  // console.log(req.params.postName);
  const reqTitle = req.params.postName;

  for(var i=0;i<posts.length ;i++){
    if(posts[i].title===reqTitle){
      // console.log("Match Found!!");
      res.render("post",{
        title : posts[i].title,
        content : posts[i].content
      })
    }
  }
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
