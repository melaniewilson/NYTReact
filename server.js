'use strict'

// dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// require article schema
const Article = require("./models/Article");

// create Express instance
const app = express();
const PORT = process.env.PORT || 3000;

// run Morgan for logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// mongoDB connect  
mongoose.connect("mongodb://heroku_l3k11mfw:jifs0lc3r0n4ugffrm1icpecua@ds137206.mlab.com:37206/heroku_l3k11mfw");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// route to saved articles
app.get("/api/saved", function(req, res) {

  // find all the records, sort it in descending order, then limit the records to 5
  Article.find({}).limit(10).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// main "/" route, redirects user to rendered React app
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// route to save articles from searches
app.post("/api/saved", function(req, res) {
  console.log("Article title: " + req.body.title);
  console.log("Article date: " + req.body.date);
  console.log("Article url: ") + req.body.url;

  // save article
  Article.create({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Article");
    }
  });
});

// route to delete saved article
app.delete("/api/saved/:id", function(req, res) {

  console.log("Article ID to delete: " + req.params.id);

  Article.findByIdAndRemove(req.params.id, function (err, response) {
    if(err){
      res.send("Delete didn't work: " + err);
    }
    res.send(response);
  });
});

app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});
